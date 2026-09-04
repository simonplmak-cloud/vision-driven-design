// A-002 — Site crawler (network, browserless-first).
// Crawls a same-origin site and extracts a structured dataset (title,
// description, lang, headings, paragraphs, images, links) per page.
//
// Transport order: an injected `fetcher` (tests) → Browserless `/content`
// (JS-rendered HTML; `BROWSERLESS_HOST` + `BROWSERLESS_TOKEN` env) → plain
// `fetch` fallback. Browserless failures degrade per-URL to plain fetch, so a
// server-rendered site still crawls when Browserless is down or absent.
//
// Discovery: the origin root plus any URLs listed in `sitemap.xml` /
// `sitemap_index.xml`, then a BFS over same-origin `<a href>` links, capped
// by `maxPages`.

import type { CrawledPage, CrawlOptions, PageFetcher, SiteDataset } from './clone-types.js';
import { normalizeDomain } from './normalize-domain.js';
import { probeCms } from './probe-cms.js';

const ASSET_EXT = /\.(png|jpe?g|gif|svg|webp|ico|css|js|json|xml|pdf|zip|mp4|webm|woff2?|ttf|eot)$/i;
const UA = 'vdd-clone/1.0 (+https://github.com/simonplmak-cloud/vision-driven-design)';

function stripTags(html: string): string {
  return html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(html: string, re: RegExp): string {
  const m = html.match(re);
  return m ? (m[1] ?? '') : '';
}

function absolutize(base: URL, raw: string): URL | null {
  try {
    return new URL(raw, base);
  } catch {
    return null;
  }
}

function canonicalKey(u: URL): string {
  const path = u.pathname === '' ? '/' : u.pathname;
  return u.origin + path;
}

function isSameOrigin(a: URL, b: URL): boolean {
  return a.origin === b.origin;
}

function extractLocs(xml: string): string[] {
  const out: string[] = [];
  const re = /<loc>\s*([^<\s][^<]*?)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.push(m[1].trim());
  return out;
}

async function fetchText(url: string, timeoutMs: number): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
    });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('json') || ct.includes('xml') || ct.includes('text/plain')) return await res.text();
    const text = await res.text();
    if (/\b(xml|html)\b/i.test(text.slice(0, 200))) return text;
    return ct.includes('text/html') ? text : null;
  } catch {
    return null;
  }
}

async function fetchBrowserless(host: string, token: string, url: string, timeoutMs: number): Promise<string | null> {
  try {
    const sep = host.includes('?') ? '&' : '?';
    const res = await fetch(`${host}/content${sep}token=${encodeURIComponent(token)}`, {
      method: 'POST',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url, waitForTimeout: 1500, rejectResourceTypes: ['image', 'font', 'media'] }),
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text && /<html|<body|<title/i.test(text.slice(0, 500)) ? text : null;
  } catch {
    return null;
  }
}

async function resolveFetcher(options: CrawlOptions): Promise<PageFetcher> {
  if (options.fetcher) return options.fetcher;
  const host = process.env.BROWSERLESS_HOST || 'http://localhost:3000';
  const token = process.env.BROWSERLESS_TOKEN || '';
  const timeoutMs = options.timeoutMs ?? 15000;
  if (token) {
    return async (url) =>
      (await fetchBrowserless(host, token, url, timeoutMs)) ?? (await fetchText(url, timeoutMs));
  }
  return async (url) => fetchText(url, timeoutMs);
}

function extractLinks(html: string, base: URL): string[] {
  const out = new Set<string>();
  const re = /<a\s[^>]*href=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const u = absolutize(base, m[1]);
    if (u && isSameOrigin(base, u) && !ASSET_EXT.test(u.pathname) && u.pathname !== '/feed') {
      out.add(canonicalKey(u));
    }
  }
  return [...out];
}

function extractImages(html: string, base: URL): string[] {
  const out = new Set<string>();
  const re = /<img\s[^>]*src=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const u = absolutize(base, m[1]);
    if (u) out.add(u.toString());
  }
  return [...out];
}

function extractHeadings(html: string): string[] {
  const out: string[] = [];
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const t = stripTags(m[2]);
    if (t) out.push(t);
  }
  return out;
}

function extractParagraphs(html: string): string[] {
  const out: string[] = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const t = stripTags(m[1]);
    if (t && t.length >= 20) out.push(t);
  }
  return out;
}

async function discoverSitemap(root: string, timeoutMs: number): Promise<string[]> {
  const locs: string[] = [];
  for (const name of ['sitemap.xml', 'sitemap_index.xml']) {
    const txt = await fetchText(root + '/' + name, timeoutMs);
    if (!txt) continue;
    const children = extractLocs(txt);
    if (/<sitemapindex/i.test(txt)) {
      let fetched = 0;
      for (const loc of children) {
        if (fetched >= 20) break;
        const child = await fetchText(loc, timeoutMs);
        if (child) {
          for (const l of extractLocs(child)) locs.push(l);
          fetched++;
        }
      }
    } else {
      for (const l of children) locs.push(l);
    }
  }
  return locs;
}

async function fetchPage(fetcher: PageFetcher, url: string): Promise<CrawledPage | null> {
  const html = await fetcher(url);
  if (!html) return null;
  const u = new URL(url);
  const title = stripTags(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)
    || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const lang = firstMatch(html, /<html[^>]*\slang=["']([^"']*)["']/i);
  return {
    url,
    path: u.pathname === '' ? '/' : u.pathname,
    title,
    description,
    lang,
    headings: extractHeadings(html),
    paragraphs: extractParagraphs(html),
    images: extractImages(html, u),
    links: extractLinks(html, u),
  };
}

export async function crawlSite(domain: string, options: CrawlOptions = {}): Promise<SiteDataset> {
  const normalized = normalizeDomain(domain);
  if ('code' in normalized) throw new Error(normalized.code + ': ' + normalized.message);
  const root = normalized.scheme + '://' + normalized.host;
  const maxPages = options.maxPages ?? 200;
  const timeoutMs = options.timeoutMs ?? 15000;

  const fetcher = await resolveFetcher(options);
  const origin = new URL(root + '/');

  const queue: string[] = [];
  const seen = new Set<string>();
  const pages: CrawledPage[] = [];
  let truncated = false;

  const enqueue = (raw: string) => {
    const u = absolutize(origin, raw);
    if (!u || !isSameOrigin(origin, u)) return;
    if (ASSET_EXT.test(u.pathname)) return;
    const key = canonicalKey(u);
    if (!seen.has(key)) {
      seen.add(key);
      queue.push(key);
    }
  };

  enqueue(root + '/');
  for (const loc of await discoverSitemap(root, timeoutMs)) enqueue(loc);

  while (queue.length > 0) {
    if (pages.length >= maxPages) {
      truncated = queue.length > 0;
      break;
    }
    const url = queue.shift()!;
    const page = await fetchPage(fetcher, url);
    if (page) {
      pages.push(page);
      if (pages.length < maxPages) {
        for (const l of page.links) enqueue(l);
      }
    }
  }

  const cms = await probeCms(root, timeoutMs);

  return { root, crawledAt: new Date().toISOString(), maxPages, truncated, pages, cms };
}
