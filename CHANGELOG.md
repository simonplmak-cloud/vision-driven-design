# Changelog

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
- **references/INDEX.md**: Gate checks (110→113), anti-patterns (16→24), added all missing primers + compliance-evidence
- **references/quick-reference.md**: Domain Primers table (4→7 rows), added MCP API section
- **vdd/docs/tutorial.md**: Version v1.5.0→v1.5.3
- **vdd/strategy.md + tactics.md**: Primer counts (4→6), pillar counts (5→12), action item counts (23→38)
- **constitution.md**: Updated for packages + API layer, MCP security constraints

### Verified
- **Benchmark**: 47/47 criteria (100%), 11 exceeded, **0 gaps** (v1.5.0 had 2)
- **Consistency**: 113 gates, 24 anti-patterns, 7 primers confirmed across all 9 public-facing files

## [1.5.0] — 2026-08-10

Initial release.