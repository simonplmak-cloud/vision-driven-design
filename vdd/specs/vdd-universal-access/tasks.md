# Task List: VDD Universal Access

> Impact Chain: V-001 → S-002 → T-003 → I-016 → SP-008 → PL-008 → TK-008

## Plan Reference
Implements: `vdd/specs/vdd-universal-access/plan.md`

## Tasks

### Setup

- [ ] **TASK-001** [M] Scaffold monorepo with pnpm workspaces
  - Creates: `vdd-universal-access/`, `packages/vdd-engine/`, `packages/vdd-mcp/`, `packages/vdd-cli/`
  - Creates: `pnpm-workspace.yaml`, root `package.json`, `tsconfig.base.json`
  - Depends on: none

- [ ] **TASK-002** [S] Configure TypeScript, ESLint, and build tooling
  - Creates: `tsconfig.json` per package, `.eslintrc`, build scripts
  - Depends on: TASK-001

### Engine Core

- [ ] **TASK-003** [L] [P] Implement vdd-engine — all 14 phase commands
  - Implements: `init`, `vision`, `strategize`, `tactics`, `specify`, `clarify`, `plan`, `tasks`, `nextTask`, `implement`, `validate`, `trace`, `analyze`, `amend`
  - Each function: Zod-validated input → Markdown artifact output
  - Satisfies: AC-4, AC-5, AC-6, AC-7
  - Depends on: TASK-002
  - Note: Can parallelize — assign phases to sub-tasks if needed

- [ ] **TASK-004** [M] Implement constitution.md parser and VDD mode resolver
  - Reads: `constitution.md` from project root
  - Resolves: `VDD_MODE` (auto/gated) from env var or constitution header
  - Validates: YAML frontmatter for compat fields
  - Satisfies: AC-7
  - Depends on: TASK-003

### MCP Server

- [ ] **TASK-005** [M] Register all 14 engine functions as MCP tools
  - Uses: `@modelcontextprotocol/sdk` Server + `CallToolRequestSchema`
  - Each tool: name (`vdd_*`), description, inputSchema (Zod → JSON Schema)
  - Satisfies: AC-1
  - Depends on: TASK-003

- [ ] **TASK-006** [S] Implement stdio transport for local agent use
  - Creates: `packages/vdd-mcp/src/stdio.ts`
  - StdioServerTransport with readline input
  - Satisfies: AC-2 (local)
  - Depends on: TASK-005

- [ ] **TASK-007** [M] Implement SSE transport for Vercel serverless
  - Creates: `packages/vdd-mcp/api/sse.ts` (Vercel function handler)
  - Creates: `vercel.json` with route config
  - Satisfies: AC-2 (remote), AC-9
  - Depends on: TASK-005

### CLI Binary

- [ ] **TASK-008** [M] Register all 14 engine functions as CLI subcommands
  - Uses: `commander` with program.command() per phase
  - Each subcommand: name, description, options (parsed with Zod)
  - `vdd --help` lists all 14 subcommands
  - Satisfies: AC-3
  - Depends on: TASK-003

- [ ] **TASK-009** [S] Implement --json output mode
  - Adds: `--json` global flag on CLI
  - Output: `{ success, artifact?, gateResult?, error? }` to stdout
  - Satisfies: AC-8
  - Depends on: TASK-008

### Deploy & Publish

- [ ] **TASK-010** [M] Deploy MCP server to Vercel
  - Configures: custom domain `vdd.simonmak.com`
  - Configures: Vercel project settings (Node 20, SSE keep-alive)
  - Verifies: MCP tools discoverable at public endpoint
  - Satisfies: AC-2
  - Depends on: TASK-007

- [ ] **TASK-011** [S] Publish packages to npm
  - Publishes: `@vdd/engine`, `@vdd/mcp`, `@vdd/cli`
  - Configures: package.json fields (name, version, bin, main, files)
  - Satisfies: AC-9
  - Depends on: TASK-003, TASK-005, TASK-008

### Verification

- [ ] **TASK-012** [L] Cross-interface integration test
  - Initializes: test project with `constitution.md`
  - Runs: same vision through agent slash cmd, MCP tool, CLI
  - Asserts: identical Impact Chain headers, section structure, gate results
  - Satisfies: AC-10
  - Depends on: TASK-004, TASK-005, TASK-008

## Dependency Graph

```
TASK-001 ──→ TASK-002 ──→ TASK-003 (Engine Core)
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         TASK-004         TASK-005         TASK-008
         (Parser)         (MCP reg)        (CLI reg)
              │               │               │
              │               ├──→ TASK-006   ├──→ TASK-009
              │               │    (stdio)    │    (--json)
              │               │               │
              │               └──→ TASK-007   │
              │                    (SSE)       │
              │                       │        │
              │                       ▼        │
              │                  TASK-010      │
              │                  (Vercel)      │
              │                       │        │
              └───────────────────────┼────────┘
                                      │
                              TASK-011 (npm publish)
                                      │
                              TASK-012 (integration test)
```

## Size Summary

| Size | Count | Tasks |
|------|-------|-------|
| S | 5 | TASK-002, TASK-006, TASK-009, TASK-011, TASK-004 |
| M | 5 | TASK-001, TASK-005, TASK-007, TASK-008, TASK-010 |
| L | 2 | TASK-003, TASK-012 |

## AC Satisfaction

| AC | Satisfied By |
|----|-------------|
| AC-1 (14 MCP tools) | TASK-005 |
| AC-2 (standalone MCP) | TASK-006, TASK-007, TASK-010 |
| AC-3 (14 CLI subcommands) | TASK-008 |
| AC-4 (identical output) | TASK-003 |
| AC-5 (shared engine) | TASK-003 |
| AC-6 (Zod validation) | TASK-003 |
| AC-7 (constitution awareness) | TASK-004 |
| AC-8 (--json output) | TASK-009 |
| AC-9 (npm publish) | TASK-007, TASK-011 |
| AC-10 (integration test) | TASK-012 |
