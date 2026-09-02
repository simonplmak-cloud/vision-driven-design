# Changelog

## [1.5.6] — 2026-09-03

### Added
- **`vdd:detect-environment` command** (16th tool): reports per-phase tool/MCP requirements and — given the host agent's `availableTools` — which capabilities are present vs. missing, plus resulting research limitations. Mirrors `references/ai-agent-patterns.md` "AI Tool Selection Per Phase".
- **`meta.ts`** in `@vdd/engine`: canonical source of truth for phase names, phase metadata, per-phase tool requirements, the 5 research subagent dispatch specs, and the 7 domain primers (shared by engine, MCP server, CLI, and mirrored into `api/sse.js`).

### Changed
- **Phase 2 (`strategize`) is now an orchestration spec**: returns the 5 research subagent dispatch specs (Market/Competitive/Technology/Impact/Domain with tools, inputs, outputs, timeouts), the resolved domain primers, environment report, and research limitations; accepts `researchFindings` to synthesize `strategy.md` (previously a bare template).
- **Substantive gates**: removed hardcoded `true` checks (F3.1, F3.5, A7.4); a freshly generated placeholder template no longer passes `vdd:validate`/`vdd:e2e` — gates now report placeholders, drift, orphans, and uncovered artifacts. Self-heal no longer auto-greens.
- **`validate` computes real drift/orphan/uncovered** from `artifactFiles` (serverless) or the filesystem (stdio/CLI) instead of returning a static all-green report.
- **`tactics` performs a real repo audit** (package.json stack, config files, top-level dirs, suggested domains) in the stdio/CLI engine.
- **Reconciled the 4 surfaces**: `packages/vdd-mcp/api/sse.ts` now delegates to the engine (was a stub); `server.ts` imports `PHASE_META`/`PHASE_NAMES` from `@vdd/engine`.
- **16 tools** (was 15): `vdd_detect_environment` added across engine, MCP, SSE, and CLI.
- **Version**: all surfaces aligned to `1.5.6`.

### Fixed
- **Stale CI gate-count check**: `.github/workflows/vdd-quality-gates.yml` now checks for `108` (was `113`).

## [1.5.5] — 2026-08-12

### Added
- **`vdd:e2e` command**: End-to-end full-chain execution — runs init→vision→strategize→tactics→specify→clarify→plan→tasks→next-task→validate in one call, writes all 10+ template files with proper impact-chain headers. Accepts optional `--actionItemId`/`--feature` to customize feature name (default: "feature-1"). Available across all 4 surfaces: engine, MCP server, SSE endpoint, CLI.
- **`VddOutput.output` field**: Structured metadata output (file lists, analysis results, instructions) for all phases.

### Fixed
- **Engine file I/O**: All 14 phase functions now use `fs/promises` to actually write template files to disk with full structured content based on `artifact-templates.md`. Previously returned artifact paths as strings without writing any files or generating content.
- **`clarify` phase**: Now reads existing spec.md, scans for `[NEEDS CLARIFICATION]` markers and `[e.g.]` placeholders, returns real counts.
- **`nextTask` phase**: Now reads tasks.md and returns the first uncompleted `TASK-*` line instead of a hardcoded string.
- **`analyze` phase**: Now reads spec.md and reports AC count, unresolved clarifications, placeholder density, and plan/tasks readiness.
- **MCP tool descriptions**: All 15 tools now have full phase context descriptions + AI agent instructions (previously just `"VDD Phase: <name>"`).
- **SSE endpoint**: `api/sse.js` now returns template content alongside artifact paths for all phase tools, and supports the full e2e chain.
- **Gate check count**: Corrected the canonical total from 113 to **108** (42 forward + 38 backward + 28 S&T) across all docs, code, and badges — the previous "47 forward" never matched the actual checklist tables.

### Changed
- **15 tools** (was 14): `vdd_e2e` added across engine, MCP, SSE, and CLI.
- **Version**: All surfaces aligned to `1.5.5` — `vdd-engine`, `vdd-mcp`, `vdd-cli` packages, MCP server info, and API server info (previously `0.1.0`/`0.2.0`).

## [1.5.4] — 2026-08-11

### Fixed
- **MCP SSE transport**: `api/sse.js` now returns proper `text/event-stream` with `endpoint` event for MCP clients (was `application/json`)
- **JSON-RPC 2.0**: POST handler supports full MCP lifecycle — `initialize`, `tools/list`, `tools/call`, notifications
- **HTML landing page**: updated with agent-specific config examples (OpenCode, Claude Desktop, Cursor)
- **index.html**: fixed broken CSS `var(--green)` → `var(--teal)`, updated MCP callout with config snippets
- **README.md**: MCP section rewritten with JSON-RPC examples, agent configuration, and curl example
- **SKILL.md**: added per-agent MCP connection instructions
- **AGENTS.md**: corrected api/sse.js transport description
- Removed dead `isMcpClient()` function from api/sse.js

## [1.5.3] — 2026-08-10

### Added
- **MCP Server**: 14 tools deployed at `vdd.simonmak.com/api/sse` — public, no-auth, Vercel serverless
- **TypeScript Packages**: `packages/vdd-engine` (14 phase fns), `packages/vdd-mcp` (14 tools), `packages/vdd-cli` (14 subcommands)
- **domain-primers/safety-critical.md**: FMEA/FTA primer with safety gate checklist (DO-178C/IEC 62304)
- **references/compliance-evidence.md**: Evidence maps for DO-178C, IEC 62304, CMMI REQM, ISO 29148
- **index.html**: GitHub Pages landing page with full methodology overview
- **GitHub Wiki**: Navigation hub with 7 primers, MCP API section, compliance links
- **VDD universal access spec/plan/tasks**: Full SDD chain for MCP + CLI feature

### Fixed
- **README.md**: Anti-patterns (23→24), domain primers (4→7), repo structure (added packages/, api/, safety-critical, compliance-evidence)
- **SKILL.md**: Domain Primers table (6→7 rows), added MCP & Packages section
- **AGENTS.md**: Directory map (added api/, packages/, index.html, safety-critical)
- **references/INDEX.md**: Gate checks (110→108), anti-patterns (16→24), added all missing primers + compliance-evidence
- **references/quick-reference.md**: Domain Primers table (4→7 rows), added MCP API section
- **vdd/docs/tutorial.md**: Version v1.5.0→v1.5.3
- **vdd/strategy.md + tactics.md**: Primer counts (4→6), pillar counts (5→12), action item counts (23→38)
- **constitution.md**: Updated for packages + API layer, MCP security constraints

### Verified
- **Benchmark**: 47/47 criteria (100%), 11 exceeded, **0 gaps** (v1.5.0 had 2)
- **Consistency**: 108 gates, 24 anti-patterns, 7 primers confirmed across all 9 public-facing files

## [1.5.0] — 2026-08-10

Initial release.
