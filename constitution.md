# Project Constitution

Version: 1.5.3
Last updated: 2026-08-10

## Architecture Principles

- **Static documentation + Thin API layer** — core methodology in markdown; MCP server in `api/sse.js`; TypeScript packages under `packages/`
- **Single source of truth per concept** — every concept has one canonical reference file; all other mentions derive from it
- **SKILL.md is the entry point** — loaded by OpenCode; must always match the OpenCode skill spec format
- **Bi-directional gate consistency** — gate check counts (113) must stay consistent across SKILL.md, README.md, quick-reference.md, and quality-gates.md
- **Superset rule** — VDD must always remain a superset of SDD; every SDD command, feature, gate check, and anti-pattern must have a VDD equivalent
- **Stable phase numbering** — phases 0 through 8 never renumber

## Technology Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Content | Markdown | All reference files are `.md` |
| API | Node.js (Vercel serverless) | `api/sse.js` — Express-style handler, public, no-auth |
| Packages | TypeScript + pnpm | `packages/vdd-engine`, `vdd-mcp`, `vdd-cli` — shared engine, MCP server, CLI |
| Version Control | Git + GitHub | Public repo at simonplmak-cloud/vision-driven-design |
| Skill Platform | OpenCode | Compatible with Claude Code and Cursor skills |

## Conventions

### Naming
- Files: kebab-case (`workflow-phases.md`, `artifact-templates.md`)
- Headers: Title Case (`## Phase 0 — Constitution`)
- IDs: Prefix-based (`V-`, `S-`, `T-`, `A-`, `SP-`, `PL-`, `TK-`, `I-`, `R-`, `AC-`)
- Tags: kebab-case in SKILL.md YAML frontmatter

## Security Constraints

- MCP server (`api/sse.js`): stateless, public endpoint (no auth), rate-limited via Vercel
- No secrets, no API keys, no user data stored — all state lives in user's repository
- CORS: wildcard for public access
- Deployment protection: disabled for public MCP access

## Banned Patterns

- No build configuration in core documentation files — packages/ and api/ only
- No auto-generated files edited outside their canonical sources
- No renumbering phases or anti-patterns
- No adding content to derived files without updating the canonical source first
- No removing SDD compatibility features

## Domain Primitives

This skill covers all domains: webapp, data-storage, etl, infrastructure, human-factors, verification-toolchain, safety-critical.
