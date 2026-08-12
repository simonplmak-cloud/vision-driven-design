# Technical Plan: VDD Universal Access Layer

> Impact Chain: V-001 → S-002 → T-003 → SP-006 → PL-006

## Spec Reference
Implements: `vdd/specs/vdd-universal-access/spec.md`

## Architecture Overview

Build a three-part TypeScript monorepo (`packages/`) that provides programmatic access to the VDD methodology: a shared engine (`vdd-engine`), an MCP server (`vdd-mcp`), and a CLI tool (`vdd-cli`). The MCP server is also deployed as a serverless function at `vdd.simonmak.com/api/sse` for public agent consumption.

## Component Breakdown

### vdd-engine (Shared Core)

- **Responsibility:** Contains all phase logic as pure functions that produce VDD artifacts
- **Location:** `packages/vdd-engine/src/`
- **Key exports:** `VisionDrive`, `processVision`, `PHASES` object with 15 phase functions
- **AC Coverage:** AC-1 (phase execution), AC-3 (Zod validation)

### vdd-mcp (MCP Server)

- **Responsibility:** Exposes VDD phases as MCP tools via stdio and SSE transports
- **Location:** `packages/vdd-mcp/src/`
- **Key exports:** MCP server instance, tool registrations
- **AC Coverage:** AC-1 (15 tools exposed), AC-2 (standalone execution)

### vdd-cli (CLI binary)

- **Responsibility:** Provides a command-line interface to all VDD phases
- **Location:** `packages/vdd-cli/src/`
- **Key exports:** Commander-based CLI with 15 subcommands
- **AC Coverage:** AC-2 (standalone execution), AC-4 (JSON output)

### api/sse (Vercel Deployment)

- **Responsibility:** Serverless MCP endpoint for agent consumption
- **Location:** `api/sse.js`
- **Key exports:** Express-like handler for Vercel
- **AC Coverage:** AC-1 (MCP server accessible)

## Technology Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | TypeScript 5.x | Already in constitution, strict mode |
| Package manager | pnpm | Workspace support, fast |
| Monorepo tooling | pnpm workspaces | Native monorepo support |
| Schema validation | Zod | Already in constitution, type-safe runtime validation |
| MCP protocol | @modelcontextprotocol/sdk v1+ | Official MCP SDK |
| CLI framework | Commander.js 12+ | Lightweight, widely adopted |
| Transport (MCP) | StdioServerTransport + SSE | Stdio for local, SSE for remote |
| Deployment | Vercel (serverless) | Already configured in `vercel.json` |

## Integration Points

- **vdd-cli → vdd-engine**: CLI imports `PHASES` and calls phase functions directly
- **vdd-mcp → vdd-engine**: MCP server imports `PHASES` and wraps each phase as an MCP tool
- **api/sse → standalone**: SSE endpoint duplicates phase logic for serverless independence
- **vdd-mcp → MCP clients**: Stdio transport for local agents, SSE transport for remote agents

## AC Coverage Map

| AC | Component(s) | Contract(s) | Verified By |
|----|-------------|-------------|-------------|
| AC-1 (MCP server) | vdd-mcp, api/sse | MCP protocol | Manual: curling the SSE endpoint |
| AC-2 (Standalone) | vdd-mcp, vdd-cli | — | Manual: running `vdd validate --project-root .` |
| AC-3 (Zod validation) | vdd-engine | — | Vitest: `tests/unit/validate.test.ts` |
| AC-4 (JSON output) | vdd-cli | — | Manual: `vdd validate --json` |
| AC-5 (SSE transport) | api/sse, vdd-mcp | MCP SSE spec | Manual: `curl -N https://vdd.simonmak.com/api/sse` |

## Toolchain Verification

| Tool | AC Coverage | CI Stage |
|------|------------|----------|
| Vitest | AC-3 | `unit-test` |
| curl/Playwright | AC-1, AC-5 | `e2e-test` |
| Manual CLI | AC-2, AC-4 | Manual |

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| MCP SDK breaking changes | Low | High | Pin SDK version, test before upgrading |
| Vercel cold starts | Medium | Low | Acceptable for public, free API |
| SSE endpoint abuse | Low | Medium | Rate limiting via Vercel, optional API key in future |
| Zod v3 vs v4 mismatch | Low | Medium | Use compatible API subset, test both versions |

## S&T Assumptions (Plan → Tasks)

**Necessity:** A Task breakdown is necessary to implement each package independently while maintaining interface compatibility via vdd-engine.

**Achievability:** This plan is achievable with a monorepo setup, pnpm workspaces, and Vercel for serverless deployment.

**Sufficiency:** The three-package structure (engine + MCP + CLI) plus a serverless endpoint is sufficient to provide universal access to VDD.

**Warnings:** Must test SSE transport end-to-end before release. MCP SDK version must be compatible with OpenCode and Claude Desktop clients.
