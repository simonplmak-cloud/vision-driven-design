#!/usr/bin/env node
// vdd-clone-scaffold — turn a vdd/clone-manifest.json into a buildable,
// deployable Next.js (App Router) + Payload CMS + Postgres project.
//
// Usage:
//   node scripts/vdd-clone-scaffold.mjs --manifest vdd/clone-manifest.json --out .
//
// Emits the manifest-derived surface: Payload collections (with localization
// + relationships), payload.config.ts, the admin/REST routes (canonical Payload
// 3 route files), a token-faithful frontend shell, docker-compose (self-hosted
// Postgres), and a seed script. Pins Payload 3.69.0 + Next 15.4.10 (Node 22).

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const manifestPath = resolve(arg('--manifest', 'vdd/clone-manifest.json'));
const outDir = resolve(arg('--out', '.'));

const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));

const locales = manifest.locales ?? [];
const defaultLocale = locales.find((l) => l.isDefault)?.code ?? locales[0]?.code ?? 'en';

// ---------- helpers ----------

const FIELD_MAP = {
  text: 'text',
  textarea: 'textarea',
  richText: 'richText',
  number: 'number',
  boolean: 'checkbox',
  date: 'date',
  email: 'email',
  select: 'select',
  relationship: 'relationship',
  upload: 'upload',
  array: 'array',
};

function payloadField(f, indent = '    ') {
  const type = FIELD_MAP[f.type] ?? 'text';
  const parts = [`name: '${f.name}'`, `type: '${type}'`];
  if (f.localized && type !== 'relationship') parts.push('localized: true');
  if (f.required) parts.push('required: true');
  if (type === 'select' && Array.isArray(f.options)) {
    parts.push(`options: [${f.options.map((o) => `'${o}'`).join(', ')}]`);
  }
  if (type === 'relationship') {
    parts.push(`relationTo: '${f.relationTo}'`);
    if (f.hasMany) parts.push('hasMany: true');
  }
  if (type === 'upload') parts.push("relationTo: 'media'");
  return indent + `{\n${indent}  ${parts.join(', ')}\n${indent}}`;
}

function labelFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

function pascal(kebab) {
  return kebab.split('-').filter(Boolean).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function collectionFile(c) {
  const useAsTitle = c.useAsTitle || 'title';
  const fields = c.fields
    .filter((f) => f.name !== 'id' && f.name !== 'language')
    .map((f) => payloadField(f))
    .join(',\n');
  const label = c.label || labelFromSlug(c.slug);
  return `import type { CollectionConfig } from 'payload'

export const ${pascal(c.slug)}: CollectionConfig = {
  slug: '${c.slug}',
  labels: { singular: '${label}', plural: '${label}' },
  admin: { useAsTitle: '${useAsTitle}' },
  access: { read: () => true },
  fields: [
${fields}
  ],
}
`;
}

// ---------- collections ----------

const collections = manifest.collections ?? [];
const collectionImports = collections.map((c) => `import { ${pascal(c.slug)} } from './collections/${pascal(c.slug)}'`).join('\n');
const collectionRegistry = collections.map((c) => pascal(c.slug)).join(', ');

// ---------- design tokens ----------

const colors = manifest.designSystem?.colors ?? {};
const fontStack = manifest.designSystem?.fonts?.length
  ? manifest.designSystem.fonts.map((f) => (f.includes(' ') ? `"${f}"` : f)).join(', ') + ', sans-serif'
  : 'sans-serif';

const tokenVars = Object.entries(colors)
  .filter(([, v]) => v && v.trim())
  .map(([k, v]) => `  ${k}: ${v};`)
  .join('\n');

const siteName = manifest.name || 'Cloned Site';
const target = manifest.target;

// ---------- files ----------

const files = {};

files['package.json'] = JSON.stringify({
  name: 'clone-site',
  version: '1.0.0',
  private: true,
  type: 'module',
  scripts: {
    dev: 'next dev',
    build: 'payload generate:importmap && next build',
    start: 'next start',
    payload: 'payload',
    'generate:importmap': 'payload generate:importmap',
    'generate:types': 'payload generate:types',
    seed: 'payload run src/seed.ts',
  },
  dependencies: {
    next: '15.4.10',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    payload: '3.69.0',
    '@payloadcms/next': '3.69.0',
    '@payloadcms/ui': '3.69.0',
    '@payloadcms/db-postgres': '3.69.0',
    '@payloadcms/richtext-lexical': '3.69.0',
    graphql: '^16.8.1',
    sharp: '0.33.5',
    dotenv: '^16.4.5',
  },
  devDependencies: {
    typescript: '^5.6.0',
    '@types/node': '^22.0.0',
    '@types/react': '^19.0.0',
    '@types/react-dom': '^19.0.0',
  },
}, null, 2) + '\n';

files['next.config.mjs'] = `import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: { root: path.resolve(dirname) },
}

export default withPayload(nextConfig)
`;

files['tsconfig.json'] = JSON.stringify({
  compilerOptions: {
    lib: ['DOM', 'DOM.Iterable', 'ES2022'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'react-jsx',
    incremental: true,
    plugins: [{ name: 'next' }],
    paths: {
      '@/*': ['./src/*'],
      '@payload-config': ['./src/payload.config.ts'],
    },
    target: 'ES2022',
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  exclude: ['node_modules'],
}, null, 2) + '\n';

files['src/payload.config.ts'] = `import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
${collectionImports}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, ${collectionRegistry}],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  localization: {
    locales: [${locales.map((l) => `'${l.code}'`).join(', ')}],
    defaultLocale: '${defaultLocale}',
    fallback: true,
  },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
})
`;

files['src/collections/Users.ts'] = `import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [{ name: 'email', type: 'email', required: true }],
}
`;

for (const c of collections) {
  files[`src/collections/${pascal(c.slug)}.ts`] = collectionFile(c);
}

files['src/app/(payload)/layout.tsx'] = `import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'

type Args = { children: React.ReactNode }

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
`;

files['src/app/(payload)/admin/[[...segments]]/page.tsx'] = `import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
`;

files['src/app/(payload)/admin/[[...segments]]/not-found.tsx'] = `import type { Metadata } from 'next'
import config from '@payload-config'
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, importMap, params, searchParams })

export default NotFound
`;

files['src/app/(payload)/api/[...slug]/route.ts'] = `import config from '@payload-config'
import '@payloadcms/next/css'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
`;

// ---------- frontend ----------

files['src/app/(frontend)/globals.css'] = `:root {
${tokenVars || '  --color-fg: #140D14;\n  --color-bg: #FFFFFF;'}
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; color: var(--color-fg, #140D14); background: var(--color-bg, #FFFFFF); font-family: ${fontStack}; }
a { color: inherit; }
.site-header { display: flex; align-items: center; gap: 2rem; padding: 1rem 2rem; border-bottom: 1px solid var(--color-border, #e8e8e8); }
.site-header .brand { font-weight: 700; }
.site-nav { display: flex; gap: 1.25rem; }
.site-footer { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 2rem; border-top: 1px solid var(--color-border, #e8e8e8); }
main { padding: 2rem; max-width: 1080px; margin: 0 auto; }
@media (max-width: 768px) { .site-footer { grid-template-columns: 1fr; } .site-nav { display: none; } }
`;

files['src/app/(frontend)/layout.tsx'] = `import React from 'react'
import './globals.css'

export const metadata = { title: '${siteName}' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <span className="brand">${siteName}</span>
          <nav className="site-nav">
            <a href="/">Home</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div>${siteName}</div>
          <div>Locales: ${locales.map((l) => l.code).join(', ') || '—'}</div>
          <div>Payload + Next.js</div>
          <div>Clone of ${target}</div>
        </footer>
      </body>
    </html>
  )
}
`;

files['src/app/(frontend)/page.tsx'] = `import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', limit: 20, depth: 1 })
  return (
    <main>
      <h1>${siteName}</h1>
      <ul>
        {pages.docs.map((p) => (
          <li key={String(p.id)}>{String((p as { title?: string }).title ?? (p as { slug?: string }).slug)}</li>
        ))}
      </ul>
    </main>
  )
}
`;

files['docker-compose.yml'] = `services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: clone
      POSTGRES_PASSWORD: clone
      POSTGRES_DB: clone
    volumes:
      - clone-pg:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U clone"]
      interval: 5s
      timeout: 3s
      retries: 10

  app:
    build: .
    ports:
      - "3001:3000"
    environment:
      DATABASE_URI: postgres://clone:clone@postgres:5432/clone
      PAYLOAD_SECRET: \${PAYLOAD_SECRET:-dev-secret-change-me}
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  clone-pg:
`;

files['Dockerfile'] = `FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json ./
RUN pnpm install

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm generate:importmap && pnpm build

FROM base AS run
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["pnpm", "start"]
`;

files['src/seed.ts'] = `import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'pages', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('pages already seeded; skipping')
    return
  }
  const page = await payload.create({
    collection: 'pages',
    data: { slug: 'home', title: '${siteName}', status: 'published' },
  })
  console.log('seeded page', page.id)
}

await seed()
`;

files['.env.example'] = `DATABASE_URI=postgres://clone:clone@localhost:5432/clone
PAYLOAD_SECRET=replace-me-with-a-long-random-string
`;

files['.gitignore'] = `node_modules
.next
.env
payload-types.ts
src/app/(payload)/admin/importMap.js
`;

// ---------- write ----------

let count = 0;
for (const [rel, content] of Object.entries(files)) {
  const abs = resolve(outDir, rel);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, content, 'utf-8');
  count++;
}

console.log(`scaffolded ${count} files from ${manifestPath} -> ${outDir}`);
console.log(`collections: ${collections.map((c) => c.slug).join(', ') || '(none)'}`);
console.log(`locales: ${locales.map((l) => l.code).join(', ') || '(none)'}`);
console.log('next steps:');
console.log('  1. cp .env.example .env  (set PAYLOAD_SECRET)');
console.log('  2. pnpm install && pnpm build   (on SWAS: cs run)');
console.log('  3. docker compose up -d  (self-hosted Postgres + app)');
