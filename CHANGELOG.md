# Changelog

All notable changes to Vision Driven Design.

## [1.5.1] — 2026-08-10

### Fixed

- **README.md**: Anti-pattern count (23→24), domain primers count (4→6), added human-factors.md and verification-toolchain.md to "Domains Covered" table and Repository Structure diagram, added scripts/ and .github/ to structure tree
- **AGENTS.md**: Expanded domain-primers/ directory map to list all 6 primers, added constitution.md and scripts/ to directory map, clarified unconditional loading of human-factors.md and verification-toolchain.md
- **references/INDEX.md**: Fixed gate check count (110→113), anti-pattern count (16→24), added missing human-factors.md and verification-toolchain.md primers to File List and Domain Primers sections
- **vdd/vision.md**: Added I-012 (GitHub artifact accuracy) impact, status Draft→Active, v1.0→v1.1

## [1.5.0] — 2026-08-10

### Added

- **11 Strategic Pillars** — Full-spectrum methodology: Adoption, Authority, Community, Proof, Accessibility, GitHub Growth, Agent Integration, Spectrum Coverage, Substance Enforcement, Benchmark Excellence, Quality-First Toolchain
- **37 Action Items** — All delivered across documentation, scripts, CI/CD, and dogfood repo
- **8 Documentation Guides**: tutorial, comparison (VDD vs SDD vs vibe coding vs TDD), vision canvas, telemetry, localization, whitepaper, community calls, impact survey
- **6 Domain Primers**: webapp, data-storage (expanded with SurrealDB 3.x, PostgreSQL, Neo4j, Redis, MongoDB), ETL, infrastructure, human-factors (behavioral economics, cognitive load, habit formation), verification-toolchain (Playwright, Browserless, Sentry, CI/CD)
- **4 Scripts**: install.sh (one-line installer), vdd-agent-setup.sh (multi-agent config generator), vdd-detect.sh (project convention auto-detector), vdd-substance-audit.sh (low-substance artifact detection)
- **GitHub CI/CD**: quality-gates workflow (impact chain verification, unresolved clarification detection, task progress, gate count consistency), vdd-quality pipeline template (9 stages: lint → typecheck → unit → e2e → visual → a11y → security → perf → deploy → sentry)
- **Dogfood Repo**: [vdd-dogfood-task-tracker](https://github.com/simonplmak-cloud/vdd-dogfood-task-tracker) — complete VDD chain + working Next.js app
- **GitHub Infrastructure**: 15 topics, Discussions enabled, issue templates (bug, feature, docs), CODEOWNERS, CONTRIBUTING.md, AGENTS.md, social preview, release v1.0.0
- **Bi-directional Gate Enhancements**: 113→113 traceability checks + 7 substance enforcement checks + 4 S&T assumptions per gate (28 total)
- **Anti-Patterns**: 24 failure modes (up from 16 in original SDD, including Ceremony Without Substance, Spec with Implementation Details, Vague ACs, Missing Error Cases, Oversized Tasks)
- **Benchmark Matrix**: VDD vs NASA SE, CMMI REQM, DO-178C, IEC 62304, DORA 2025, ISO 29148, GitHub Spec Kit — 42/42 criteria matched (100%), 10 exceeded
- **VDD Badge**: `[![Built with VDD](https://img.shields.io/badge/built%20with-VDD-4CAF50)]`
- **Star-Growth Campaign Plan**: Coordinated launch strategy across HN, Reddit, Dev.to, LinkedIn
- **Community Engagement Plan**: Response SLAs, good-first-issue labels, contributor recognition
- **Agent Auto-Integration**: Support for OpenCode, Claude Code, Cursor, Copilot; Agent SDK concept
- **Substance Enforcement**: Gate-level checks rejecting cosmetic-only contributions

### Changed

- **Vision refined 6×**: Society impact → GitHub promotion → Auto-integration → Full-spectrum coverage → Substance over ceremony → Best-practice excellence → Quality-first toolchain
- **Tactics scaled**: 13 → 18 → 23 → 27 → 30 → 34 → 37 action items
- **Strategy pillars**: 5 → 7 → 9 → 10 → 11
- **Domain primers**: 4 → 5 → 6
- **Anti-patterns**: 16 → 23 → 24
- **Plan template**: AC Coverage Map now includes "Verified By" column (tool per AC)
- **README**: Added Mermaid diagram, badges (stars, last commit, VDD), TOC, Guides section
- **About description**: Optimized for SEO keyword density

### Fixed

- Impact Chain header on `vdd/impact-report.md` (CI gate detection)
- Stale "110" count → "113" in README chain diagram
- A-001 marked incomplete in tactics table (was delivered)

### Superset Verification

VDD is a verified superset of SDD:
- 14 VDD commands (10 SDD + 4 new)
- All 16 SDD anti-patterns covered by VDD's 24
- All SDD gate checks preserved and enhanced
- SDD backward-compatibility via `/vdd:specify "freeform description"`
- SDD spec levels (spec-first, spec-anchored, spec-as-source) fully supported

---

## [1.0.0] — 2026-08-10

### Added

- Initial release
- 8-phase chain: Vision → Strategy → Tactics → Specs → Plan → Tasks → Implement → Validate
- 7 bi-directional gates with 113 verification checks
- 4 domain primers: webapp, data-storage, ETL, infrastructure
- 11 artifact templates with impact chain headers
- Full-auto mode: human provides vision, AI drives the rest
- Recursive Goldratt S&T decomposition at every phase junction
- 16 anti-patterns (absorbed from SDD)
- SKILL.md (OpenCode entry point), README.md, LICENSE.md (MIT)
