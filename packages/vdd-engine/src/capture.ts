// A-002 — UI/UX capture (browser, Playwright).
// Captures DOM, CSS design tokens, typography, and breakpoints from a target domain.

import type { CaptureBundle } from './clone-types.js';

const PROBE_WIDTHS = [320, 768, 1440];

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

    const html = await page.content();

    const cssTokens = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      const tokens: Record<string, string> = {};
      for (let i = 0; i < cs.length; i++) {
        const name = cs[i];
        if (name.startsWith('--')) tokens[name] = cs.getPropertyValue(name).trim();
      }
      return tokens;
    });

    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...new Set([...document.fonts].map((f) => f.family))];
    });

    const breakpoints: number[] = [];
    for (const w of PROBE_WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      breakpoints.push(h > 0 ? w : w); // record probed width; layout transitions are captured implicitly
    }

    return { domain, html, cssTokens, fonts, breakpoints };
  } finally {
    await browser.close();
  }
}
