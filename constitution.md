# Project Constitution

Version: 1.5.3
Last updated: 2026-08-10

## Architecture Principles

- **Static documentation + Thin API layer** — this repo contains markdown documentation and a minimal MCP server (api/sse.js). TypeScript packages under `packages/` provide the CLI and MCP server engine.
- **Single source of truth per concept** — every concept has one canonical reference file; all other mentions derive from it
- **SKILL.md is the entry point** — it is loaded by OpenCode and must always match the OpenCode skill spec format
- **Bi-directional gate consistency** — gate check counts (113) must stay consistent across SKILL.md, README.md, quick-reference.md, and quality-gates.md
- **Superset rule** — VDD must always remain a superset of SDD; every SDD command, feature, gate check, and anti-pattern must have a VDD equivalent
- **Stable phase numbering** — phases 0 through 8 never renumber

## Technology Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Content | Markdown | All files are `.md` |
| Version Control | Git + GitHub | Public repo at simonplmak-cloud/vision-driven-design |
| Skill Platform | OpenCode | Compatible with Claude Code and Cursor skills |
| Build/Runtime | None | API layer uses Vercel serverless (Node.js); packages use TypeScript + pnpm |

## Conventions

### Naming Conventions

- Files: kebab-case (`workflow-phases.md`, `artifact-templates.md`)
- Headers: Title Case (`## Phase 0 — Constitution`)
- IDs: Prefix-based (`V-`, `S-`, `T-`, `A-`, `SP-`, `PL-`, `TK-`, `I-`, `R-`, `AC-`)
- Tags: kebab-case in SKILL.md YAML frontmatter

### File Structure Rules

```
SKILL.md                    ← Entry point (loaded by OpenCode)
README.md                   ← GitHub README
AGENTS.md                   ← Agent instructions for this repo
CONTRIBUTING.md             ← Contribution guidelines
LICENSE.md                  ← MIT
domain-primers/             ← Domain-specific research + impact verification patterns
  webapp.md
  data-storage.md
  etl.md
  infrastructure.md
references/                 ← Authoritative reference documentation
  INDEX.md                  ← Navigation map
  quick-reference.md        ← Derived: update when sources change
  workflow-phases.md        ← Authoritative: phase order and steps
  artifact-templates.md     ← Authoritative: all artifact structures
  prompt-patterns.md        ← Authoritative: all AI prompts
  quality-gates.md          ← Authoritative: gate checklists and counts
  ai-agent-patterns.md      ← Authoritative: agent orchestration
  anti-patterns.md          ← Authoritative: failure modes
  traceability-matrix.md    ← RTM format and CI/CD
docs/                       ← Assets (social preview images, etc.)
  social-preview.svg
.github/                    ← GitHub-specific config
  ISSUE_TEMPLATE/
```

## Security Constraints

*Not applicable — this repo contains no code, no API keys, no secrets, no user data.*

## Banned Patterns

- No build configuration outside of `packages/` and `api/` — core documentation remains build-free
- No auto-generated files edited outside their canonical sources
- No renumbering phases or anti-patterns
- No adding content to derived files without updating the canonical source first
- No removing SDD compatibility features

## Domain Primitives

This skill covers all four domains:

- webapp
- data-storage
- etl
- infrastructure

## Open Questions / Deferred Decisions

*None — this repo is complete as a static skill documentation project.*
