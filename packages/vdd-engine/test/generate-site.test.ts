import { describe, it, expect } from 'vitest';
import { generateSite } from '../src/generate-site.js';
import type { CaptureBundle, SiteDataset } from '../src/clone-types.js';

const dataset: SiteDataset = {
  root: 'https://example.com',
  crawledAt: '2026-09-04T00:00:00.000Z',
  maxPages: 200,
  truncated: false,
  pages: [
    {
      url: 'https://example.com/',
      path: '/',
      title: 'Home',
      description: 'Welcome home',
      lang: 'en',
      headings: ['Hello'],
      paragraphs: ['A long enough paragraph for the home page content.'],
      images: ['https://example.com/logo.png'],
      links: ['https://example.com/about'],
    },
    {
      url: 'https://example.com/about',
      path: '/about',
      title: 'About',
      description: '',
      lang: 'en',
      headings: ['About Us'],
      paragraphs: ['Another long enough paragraph for the about page.'],
      images: [],
      links: ['https://example.com/'],
    },
  ],
};

const capture: CaptureBundle = {
  domain: 'https://example.com',
  html: '<html></html>',
  cssTokens: { '--brand': '#140D14', '--empty': '  ' },
  fonts: ['Source Sans Pro'],
  breakpoints: [320, 768, 1440],
};

describe('generateSite (A-006)', () => {
  it('emits a deployable dynamic bundle (html + js + dataset + css + vercel)', () => {
    const site = generateSite(dataset, capture);
    expect(site.index).toBe('index.html');
    const paths = site.files.map((f) => f.path).sort();
    expect(paths).toEqual(['app.js', 'data/pages.json', 'index.html', 'style.css', 'vercel.json']);
  });

  it('serializes the full dataset into data/pages.json', () => {
    const site = generateSite(dataset, capture);
    const json = site.files.find((f) => f.path === 'data/pages.json')!.content;
    const parsed = JSON.parse(json) as SiteDataset;
    expect(parsed.root).toBe('https://example.com');
    expect(parsed.pages).toHaveLength(2);
    expect(parsed.pages[0].path).toBe('/');
    expect(parsed.pages[1].title).toBe('About');
  });

  it('injects design tokens into style.css and renders pages via app.js', () => {
    const site = generateSite(dataset, capture);
    const css = site.files.find((f) => f.path === 'style.css')!.content;
    expect(css).toContain('--brand: #140D14;');
    expect(css).not.toContain('--empty:');
    const app = site.files.find((f) => f.path === 'app.js')!.content;
    expect(app).toContain("fetch('data/pages.json')");
    expect(app).toContain('hashchange');
  });

  it('embeds an inline SVG favicon in index.html', () => {
    const site = generateSite(dataset, capture);
    const html = site.files.find((f) => f.path === 'index.html')!.content;
    expect(html).toContain("<link rel=\"icon\" href=\"data:image/svg+xml,");
    expect(html).toContain('%3C/svg%3E');
  });
});
