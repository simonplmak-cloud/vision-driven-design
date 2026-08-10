# Technical Plan: VDD Universal Access

> Impact Chain: V-001 → S-002 → T-003 → I-016 → SP-008 → PL-008

## Spec Reference
Implements: `vdd/specs/vdd-universal-access/spec.md`

## Architecture Overview

A TypeScript monorepo with three packages sharing a single VDD engine:

```
vdd-universal-access/
  packages/
    vdd-engine/       # Shared core — all 14 phase commands implemented once
    vdd-mcp/           # MCP server — wraps engine as MCP tools (stdio + SSE transports)
    vdd-cli/           # CLI binary — wraps engine as commander subcommands
```

The engine is the single source of truth for all VDD logic. MCP server and CLI are thin shells that:
1. Accept user input (MCP tool params or CLI args)
2. Call the same engine functions
3. Return output in the appropriate format (MCP tool result or stdout)

Deployment: MCP server published to npm, deployed to Vercel as a serverless function behind `vdd.simonmak.com`.

## Component Breakdown

### vdd-engine (shared core)
- **Responsibility:** Implement all 14 VDD phase commands as pure functions
- **Location:** `packages/vdd-engine/src/`
- **Key exports:** `init()`, `vision()`, `strategize()`, `tactics()`, `specify()`, `clarify()`, `plan()`, `tasks()`, `nextTask()`, `implement()`, `validate()`, `trace()`, `analyze()`, `amend()`
- **AC Coverage:** AC-5 (shared engine), AC-6 (Zod validation), AC-7 (constitution awareness)

### vdd-mcp (MCP server)
- **Responsibility:** Expose all 14 engine functions as MCP tools via stdio and SSE transports
- **Location:** `packages/vdd-mcp/src/`
- **Key exports:** MCP server instance, tool registrations
- **AC Coverage:** AC-1 (14 tools exposed), AC-2 (standalone execution)

### vdd-cli (CLI binary)
- **Responsibility:** Expose all 14 engine functions as CLI subcommands
- **Location:** `packages/vdd-cli/src/`
- **Key exports:** CLI entrypoint (`vdd`), commander subcommand definitions
- **AC Coverage:** AC-3 (14 subcommands), AC-4 (identical output to agent), AC-8 (--json flag)

### Vercel Deployment
- **Responsibility:** Host the MCP server at `vdd.simonmak.com` via serverless functions
- **Location:** `packages/vdd-mcp/api/`
- **Transport:** SSE (Server-Sent Events) for MCP over HTTP
- **AC Coverage:** AC-2 (standalone, no OpenCode required)

## Technology Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | TypeScript 5.x (strict) | MCP SDK is TypeScript-native; Zod integrates seamlessly |
| Runtime | Node.js 20+ (Vercel) | Vercel serverless supports Node.js 20; MCP SDK requires 18+ |
| Package manager | pnpm | Workspace support for monorepo; faster than npm |
| MCP SDK | `@modelcontextprotocol/sdk` | Official MCP TypeScript SDK — tool registration, transports, tool call handling |
| CLI framework | `commander` | Mature, typed, handles --help, subcommands, --json flag natively |
| Validation | `zod` | Runtime validation of all inputs; produces structured errors for MCP and CLI |
| Deployment | Vercel serverless functions | Free tier, automatic HTTPS, zero-config TypeScript, custom domain support |
| Monorepo | pnpm workspaces | Shared engine package consumed by both MCP and CLI without duplication |
| Transport | SSE (MCP over HTTP) for Vercel; stdio for local | Vercel supports long-running HTTP; stdio for local agent use |

## Data Flow

```
User Agent (MCP Client)          CLI Terminal
        │                              │
        ▼                              ▼
  MCP Tool Call                 `vdd vision "..."`     
        │                              │
        ▼                              ▼
    vdd-mcp ──┐                vdd-cli ──┐
              │                          │
              ▼                          ▼
         vdd-engine (shared core)
              │
              ▼
    vdd/vision.md (written to user's repo)
```

## AC Coverage Map

| AC | Component(s) | Contract(s) |
|----|-------------|-------------|
| AC-1 (14 MCP tools) | vdd-mcp | MCP tool schema per tool |
| AC-2 (standalone MCP) | vdd-mcp, Vercel Deployment | SSE endpoint contract |
| AC-3 (14 CLI subcommands) | vdd-cli | CLI --help output |
| AC-4 (identical output) | vdd-engine, vdd-cli, vdd-mcp | Artifact structure contract |
| AC-5 (shared engine) | vdd-engine | Engine API contract |
| AC-6 (Zod validation) | vdd-engine | Error response schema |
| AC-7 (constitution awareness) | vdd-engine | constitution.md parser |
| AC-8 (--json output) | vdd-cli | JSON output schema |
| AC-9 (npm publish) | vdd-mcp, vdd-cli, vdd-engine | npm publish workflow |
| AC-10 (integration test) | All components | Cross-interface test harness |

## Contracts

### Engine API Contract
```typescript
// Every phase function follows this pattern:
type VddPhaseFn = (input: ValidatedInput, context: VddContext) => Promise<VddOutput>;

interface VddContext {
  projectRoot: string;      // Path to user's project
  constitution: Constitution; // Parsed constitution.md
  mode: 'auto' | 'gated';   // From constitution or env
}
```

### MCP Tool Schema Contract (per tool)
```typescript
{
  name: "vdd_vision",
  description: "Expand freeform vision into structured vision.md",
  inputSchema: {
    type: "object",
    properties: {
      statement: { type: "string", description: "Freeform vision statement" },
      projectRoot: { type: "string", description: "Path to project root" }
    },
    required: ["statement"]
  }
}
```

### CLI Output Contract (--json mode)
```typescript
interface CliJsonOutput {
  success: boolean;
  artifact?: string;        // Path to created artifact
  gateResult?: GateResult;  // If applicable
  error?: ZodError;        // If validation failed
}
```

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| MCP SDK API breaks between versions | Medium | High | Pin SDK version; add renovate/dependabot for automated updates |
| Vercel cold starts impact MCP latency | Medium | Medium | Use Vercel Edge Functions for lower latency; SSE transport tolerates latency better than request/response |
| Engine function signatures diverge across interfaces | Low | High | Single engine module imported by both; integration test (AC-10) catches divergence |
| npm publish conflicts (multiple packages) | Low | Medium | Use changesets or lerna-lite for coordinated versioning |
| Vercel free tier limits (execution time, bandwidth) | Medium | Medium | Monitor usage; add rate limiting; cache engine results where safe |

## S&T Assumptions (Plan → Tasks)

**Necessity:** Task breakdown is necessary to sequence engine implementation, MCP server wrapping, CLI binary creation, npm publishing, Vercel deployment, and integration testing.

**Achievability:** This plan is achievable — TypeScript monorepo with pnpm workspaces, MCP SDK is mature and well-documented, Vercel deployment is a single command, npm publishing is standard CI.

**Sufficiency:** The planned tasks are sufficient to deliver all 10 ACs covering MCP, CLI, and shared engine with cross-interface validation.

**Warnings:** (1) MCP transport over SSE on Vercel serverless may require keep-alive or WebSocket upgrade — test early. (2) npm package naming (scoped vs unscoped) needs final decision before publish. (3) Vercel custom domain (`vdd.simonmak.com`) requires DNS configuration.
