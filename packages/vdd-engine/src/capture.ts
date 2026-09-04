// A-002 — UI/UX capture (browser, Playwright).
// Captures the *actual* rendered UI, not just a handful of CSS variables:
//   • full serialized stylesheet rules (media queries preserved) — the single
//     most important input for a faithful clone
//   • every CSS custom property (color, spacing, radius, shadow, …)
//   • @font-face sources (so custom fonts survive, not just family names)
//   • the rendered outerHTML of the key layout regions (header/nav, hero, footer)
//   • real responsive breakpoints (from @media width conditions)
// Everything is gathered in-page so the clone has enough signal to reproduce
// the original look instead of falling back to a generic shell.

import type { CaptureBundle, FontFaceRef, LayoutMetrics, RegionCapture } from './clone-types.js';

const PROBE_WIDTHS = [320, 768, 1440];

// Loose structural view of a CSS rule so we can read subtype-specific members
// (media wrappers, @font-face, style declarations) without casting to `any`.
interface AnyRule {
  cssText?: string;
  conditionText?: string;
  cssRules?: CSSRuleList | null;
  style?: CSSStyleDeclaration | null;
}

async function evaluateCapture(): Promise<{
  html: string;
  css: string;
  tokens: Record<string, string>;
  fonts: string[];
  fontFaces: FontFaceRef[];
  regions: RegionCapture[];
  metrics: LayoutMetrics;
}> {
  try {
    await (document.fonts && document.fonts.ready);
  } catch {
    /* fonts API unavailable — continue */
  }

  const cssParts: string[] = [];
  const fontFaces: FontFaceRef[] = [];
  const seenFaces = new Set<string>();

  const ctorName = (rule: unknown): string => {
    const c = (rule as { constructor?: { name?: string } })?.constructor;
    return c?.name ?? '';
  };
  const safeCssText = (rule: unknown): string => {
    try {
      return (rule as { cssText?: string }).cssText ?? '';
    } catch {
      return '';
    }
  };

  for (const sheet of Array.from(document.styleSheets as unknown as CSSStyleSheet[])) {
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin / inaccessible stylesheet
    }
    if (!rules) continue;
    for (const rule of Array.from(rules) as unknown as AnyRule[]) {
      const ctor = ctorName(rule);
      if (ctor === 'CSSMediaRule' || ctor === 'CSSSupportsRule') {
        const inner: string[] = [];
        try {
          for (const r of Array.from(rule.cssRules ?? []) as unknown as AnyRule[]) {
            inner.push(safeCssText(r));
          }
        } catch {
          /* ignore */
        }
        cssParts.push('@media ' + rule.conditionText + ' {\n' + inner.join('\n') + '\n}');
        for (const r of Array.from(rule.cssRules ?? []) as unknown as AnyRule[]) {
          if (ctorName(r) === 'CSSFontFaceRule') {
            const fam = (r.style?.getPropertyValue('font-family') ?? '').trim();
            const src = (r.style?.getPropertyValue('src') ?? '').trim();
            const key = fam + '|' + src;
            if (fam && src && !seenFaces.has(key)) {
              seenFaces.add(key);
              fontFaces.push({ family: fam, src });
            }
          }
        }
      } else if (ctor === 'CSSFontFaceRule') {
        const fam = (rule.style?.getPropertyValue('font-family') ?? '').trim();
        const src = (rule.style?.getPropertyValue('src') ?? '').trim();
        const key = fam + '|' + src;
        if (fam && src && !seenFaces.has(key)) {
          seenFaces.add(key);
          fontFaces.push({ family: fam, src });
        }
        cssParts.push(safeCssText(rule));
      } else {
        cssParts.push(safeCssText(rule));
      }
    }
  }

  for (const style of Array.from(document.querySelectorAll('style'))) {
    const t = style.textContent || '';
    if (t.trim()) cssParts.push(t);
  }

  const css = cssParts.filter(Boolean).join('\n');

  const outerOf = (sel: string): string => {
    const el = document.querySelector(sel);
    return el ? el.outerHTML : '';
  };
  const regions: RegionCapture[] = [];
  const nav = outerOf('nav');
  if (nav) regions.push({ name: 'nav', selector: 'nav', html: nav });
  const header = outerOf('header');
  if (header) regions.push({ name: 'header', selector: 'header', html: header });
  const heroEl =
    document.querySelector('main section:first-of-type') || document.querySelector('main > :first-child');
  if (heroEl) regions.push({ name: 'hero', selector: 'main section:first-of-type', html: heroEl.outerHTML });
  // The page body — for WordPress/Divi this is `#main-content` (hero + builder
  // sections); for generic sites `main` or `[role=main]`.
  const mainEl =
    document.querySelector('main') ||
    document.querySelector('#main-content') ||
    document.querySelector('[role="main"]') ||
    document.querySelector('.entry-content') ||
    document.querySelector('article');
  if (mainEl) regions.push({ name: 'main', selector: '#main-content, main, [role="main"], article', html: mainEl.outerHTML });
  const footer = outerOf('footer');
  if (footer) regions.push({ name: 'footer', selector: 'footer', html: footer });

  const cs = getComputedStyle(document.documentElement);
  const tokens: Record<string, string> = {};
  for (let i = 0; i < cs.length; i++) {
    const name = cs[i];
    if (name.startsWith('--')) tokens[name] = cs.getPropertyValue(name).trim();
  }

  const families = [...new Set(Array.from(document.fonts).map((f) => f.family))];

  // Layout metrics for JS-driven sizes (page-builder logos, fixed headers)
  // that a static CSS+HTML snapshot can't recompute on its own.
  const headerEl = document.querySelector('#main-header, header');
  const logoEl = document.querySelector('#logo, header img, nav img');
  const metrics: LayoutMetrics = {
    headerHeight: headerEl ? Math.round(headerEl.getBoundingClientRect().height) : undefined,
    logoHeight: logoEl ? Math.round(logoEl.getBoundingClientRect().height) : undefined,
    headerPosition: headerEl ? getComputedStyle(headerEl).position : undefined,
  };

  return {
    html: document.documentElement.outerHTML,
    css,
    tokens,
    fonts: families,
    fontFaces,
    regions,
    metrics,
  };
}

// Extract real responsive breakpoints from @media width conditions in the
// captured CSS, falling back to the probe widths when none are found.
function extractBreakpoints(css: string): number[] {
  const widths = new Set<number>();
  const re = /@media[^{]*?\((?:min|max)-width\s*:\s*(\d+(?:\.\d+)?)px\)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    const v = parseFloat(m[1]);
    if (Number.isFinite(v)) widths.add(Math.round(v));
  }
  const sorted = [...widths].sort((a, b) => a - b);
  return sorted.length > 0 ? sorted : PROBE_WIDTHS;
}

export async function capture(domain: string, options?: { timeoutMs?: number }): Promise<CaptureBundle> {
  let pw: typeof import('playwright');
  try {
    pw = await import('playwright');
  } catch {
    throw new Error('Playwright is not installed. Run `pnpm add -D playwright && npx playwright install chromium`.');
  }

  const browser = await pw.chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(domain, { timeout: options?.timeoutMs ?? 60000, waitUntil: 'domcontentloaded' });

    const result = await page.evaluate(evaluateCapture);

    return {
      domain,
      html: result.html,
      css: result.css,
      cssTokens: result.tokens,
      fonts: result.fonts,
      fontFaces: result.fontFaces,
      breakpoints: extractBreakpoints(result.css),
      regions: result.regions,
      metrics: result.metrics,
    };
  } finally {
    await browser.close();
  }
}
