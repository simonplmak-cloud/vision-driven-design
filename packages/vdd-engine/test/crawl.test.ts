import { describe, it, expect, vi, afterEach } from 'vitest';
import { crawlSite } from '../src/crawl.js';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.BROWSERLESS_TOKEN;
});

const HOME = '<html lang="en"><head><title>Home</title><meta name="description" content="Welcome home"></head>' +
  '<body><h1>Hello</h1><p>This is a long enough paragraph for the home page extraction.</p>' +
  '<img src="/logo.png"><a href="/about">About</a><a href="https://external.com/x">Ext</a></body></html>';

const ABOUT = '<html lang="en"><head><title>About</title></head>' +
  '<body><h2>About Us</h2><p>Another long enough paragraph that meets the minimum length requirement.</p>' +
  '<a href="/">Home</a></body></html>';

describe('crawlSite (A-002)', () => {
  it('crawls pages via an injected fetcher and extracts the dataset', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 404 })));
    const fetcher = async (url: string) => (url.endsWith('/about') ? ABOUT : HOME);

    const ds = await crawlSite('https://example.com', { fetcher });

    expect(ds.root).toBe('https://example.com');
    expect(ds.pages).toHaveLength(2);

    const home = ds.pages.find((p) => p.path === '/')!;
    expect(home.title).toBe('Home');
    expect(home.description).toBe('Welcome home');
    expect(home.lang).toBe('en');
    expect(home.headings).toContain('Hello');
    expect(home.paragraphs.some((p) => p.includes('long enough paragraph'))).toBe(true);
    expect(home.images).toEqual(['https://example.com/logo.png']);
    expect(home.links).toEqual(['https://example.com/about']); // same-origin only

    const about = ds.pages.find((p) => p.path === '/about')!;
    expect(about.title).toBe('About');
  });

  it('prefers the browserless /content transport when BROWSERLESS_TOKEN is set', async () => {
    process.env.BROWSERLESS_TOKEN = 'tok';
    const mock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes('/content')) {
        const body = JSON.parse(String(init?.body ?? '{}')) as { url?: string };
        return new Response(body.url === 'https://example.com/' ? HOME : ABOUT, { status: 200 });
      }
      return new Response('', { status: 404 });
    });
    vi.stubGlobal('fetch', mock);

    const ds = await crawlSite('https://example.com', {});
    expect(mock.mock.calls.some(([u]) => String(u).includes('/content'))).toBe(true);
    expect(ds.pages).toHaveLength(2);
    expect(ds.pages[0].title).toBe('Home');
    expect(ds.pages[1].title).toBe('About');
  });

  it('truncates at maxPages when more pages remain', async () => {
    const sitemap = '<?xml version="1.0"?><urlset>' +
      '<url><loc>https://example.com/a</loc></url>' +
      '<url><loc>https://example.com/b</loc></url>' +
      '<url><loc>https://example.com/c</loc></url></urlset>';
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/sitemap.xml')) {
        return new Response(sitemap, { status: 200, headers: { 'content-type': 'application/xml' } });
      }
      return new Response('', { status: 404 });
    }));
    const fetcher = async () => HOME;
    const ds = await crawlSite('https://example.com', { fetcher, maxPages: 2 });
    expect(ds.pages).toHaveLength(2);
    expect(ds.truncated).toBe(true);
  });

  it('rejects an invalid domain', async () => {
    await expect(crawlSite('not a url', {})).rejects.toThrow('INVALID_HOST');
  });
});
