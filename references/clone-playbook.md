# Clone Playbook — vdd:clone → live site

> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006

How `vdd e2e -clone <domain>` turns a target website into a **live, operational
clone** — token-faithful UI/UX + a functional backend (Payload CMS + Next.js +
self-hosted Postgres).

## Pipeline (engine, deterministic)

```
normalize → crawl → probe CMS → capture → evidence → infer schema
   → Payload collections → scaffold manifest → AI tools
```

Outputs (all under `vdd/`):

| File | Purpose |
|---|---|
| `clone.md` | Human summary (stages, locales, entities, collections, routes) |
| `clone-dataset.json` | Crawled pages + CMS descriptor |
| `clone-schema.json` | Inferred entity/relationship model |
| `clone-capture.json` | Design tokens / fonts / breakpoints (best-effort) |
| `clone-manifest.json` | **Single source of truth** for scaffolding |

The manifest declares `stack = nextjs + payload + postgres + tailwind` and the
`deploy.target = docker-swaw`. The host agent turns it into a live site.

## Host agent: scaffold → build → deploy

### 1. Scaffold

```
node scripts/vdd-clone-scaffold.mjs --manifest vdd/clone-manifest.json --out .
```

Emits a buildable Next.js (App Router) + Payload 3 + Postgres project at the
project root (`.` = the cloned-site root): Payload collections (localized,
relationship fields from the manifest), `payload.config.ts`, admin + REST
routes, a token-faithful frontend shell, `docker-compose.yml`, and a seed script.

### 2. Configure

```
cp .env.example .env          # set PAYLOAD_SECRET
```

### 3. Build (on the SWAS box — never locally)

```
cs provision   # first time: clone + install deps
cs run "pnpm install && pnpm build"
```

### 4. Deploy (self-hosted, open source — no managed DB)

```
cs run "docker compose up -d --build"
```

`docker-compose.yml` runs `postgres:16-alpine` (open source) on host **5433** +
the app on host **3001** (port 3000 on the box is taken by Browserless). Payload
auto-migrates on first boot; the seed script populates the first page.

Access the live clone locally:

```
ssh -N -L 3001:localhost:3001 workbench   # then open http://localhost:3001
```

### 5. Seed content

```
cs run "env DATABASE_URI=postgres://clone:clone@localhost:5433/clone PAYLOAD_SECRET=<secret> pnpm run seed"
```

### 6. Fidelity audit

```
# screenshot diff + links + a11y vs the original (clone-audit / difflens)
```

## Localization

Payload localization is per-field (`localized: true`) and driven by
`config.localization.locales` (from the manifest's Polylang locales, e.g.
`en` / `tc` / `sc`). Each localized collection stores all locales in one
document — no sibling-page duplication.

## Donations

If the crawl detected a donation surface, the manifest carries
`donation.provider = 'stripe'`. Wire Stripe in `src/app/(app)/donate` using
Checkout Sessions (see `stripe-best-practices` skill); do not hardcode keys.

## Verification checklist

- [ ] `pnpm build` passes on SWAS
- [ ] `docker compose up` starts postgres + app; `/admin` loads
- [ ] `/api/pages` (REST) returns seeded pages
- [ ] All 3 locales render (e.g. `/en`, `/tc`, `/sc`)
- [ ] Fidelity audit vs original passes (or gaps logged)
