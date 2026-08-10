# VDD Universal Access — MCP Server + CLI + API

> Impact Chain: V-001 → S-002 → T-003 → I-016 → SP-008
> Delivered: simonplmak-cloud/vision-driven-design

Status: Draft
Version: 1.0
Last updated: 2026-08-10

## Tactical Origin
Implements: `vdd/vision.md` → Impact I-016 — VDD accessible through every developer interface (MCP, CLI, REST API, IDE plugins)

## Overview

VDD is currently accessible only as an OpenCode skill (slash commands). This spec defines the universal access layer — an MCP server exposing VDD tools to any MCP-compatible client, and a CLI binary for terminal-native workflows. Both call the same canonical VDD engine so methodology, gates, and checks are invariant regardless of interface.

## User Stories

### Primary
As a developer using any MCP-compatible AI agent (Claude Desktop, Continue.dev, Cursor), I want to invoke VDD via MCP tools (`vdd_init`, `vdd_vision`, `vdd_validate`) so that I can use VDD without switching to OpenCode.

### Secondary
As a terminal-native developer, I want to run `vdd init`, `vdd vision "..."`, `vdd validate` as CLI commands so that I can integrate VDD into shell scripts, CI pipelines, and Docker containers.

## Boundaries

**Always do:**
- Expose every VDD phase command as both an MCP tool and a CLI subcommand
- Share a single VDD engine module — MCP server and CLI both `import` the same core
- Validate inputs with Zod at every boundary
- Support `VDD_MODE=gated` and constitution Mode detection in all interfaces

**Ask first:**
- Which MCP transport to prioritize (stdio for local, SSE/streamable HTTP for remote)
- Whether the CLI should be a standalone npm package or part of the skill repo
- npm package name and scope

**Never do:**
- Duplicate phase logic across interfaces — one engine, many shells
- Require OpenCode to be installed for MCP or CLI usage
- Expose internal gate logic directly to users — tools/subcommands are high-level

## Acceptance Criteria

### AC-1: MCP server exposes all 14 VDD commands [MUST]
Given an MCP client connected to the VDD MCP server
When the client lists available tools
Then all 14 VDD commands are exposed as MCP tools with matching names and parameter schemas

### AC-2: MCP server runs standalone [MUST]
Given a machine with Node.js 20+
When `npx vdd-mcp` or `node vdd-mcp-server.js` is executed
Then the MCP server starts, registers tools via stdio or SSE transport, and responds to tool invocations without requiring OpenCode

### AC-3: CLI binary exposes all 14 VDD commands [MUST]
Given `vdd` is installed via npm/pnpm
When `vdd --help` is executed
Then all 14 subcommands are listed with usage descriptions

### AC-4: CLI produces identical output to agent slash commands [MUST]
Given the same project and the same input
When `vdd vision "my vision"` is run via CLI vs `/vdd:vision "my vision"` via agent
Then both produce structurally identical `vdd/vision.md` (same sections, same template)

### AC-5: Shared engine module [MUST]
Given the VDD codebase
When examining the MCP server and CLI binary entrypoints
Then both import from a single `vdd-engine` module that contains all phase logic — no logic duplicated across interfaces

### AC-6: Parameter validation [MUST]
Given any VDD tool or CLI subcommand
When invoked with invalid or missing parameters
Then a structured error is returned (Zod validation error with field-level messages), never a raw stack trace

### AC-7: Constitution and Mode awareness [MUST]
Given a project with `constitution.md` containing `## VDD Mode: gated` or `export VDD_MODE=gated`
When any VDD command is invoked via MCP or CLI
Then the engine reads constitution settings and enforces gated mode identically to agent commands

### AC-8: CLI supports --json output [SHOULD]
Given `vdd validate --json`
When the command completes
Then output is valid JSON (not markdown), enabling pipe to `jq`, CI scripts, and programmatic consumers

### AC-9: MCP server publishes to npm [SHOULD]
Given the VDD MCP server package
When `pnpm publish` is executed
Then the package is available on npm under a VDD namespace with correct peer dependency declarations

### AC-10: Integration test across all interfaces [SHOULD]
Given a test project initialized with `/vdd:init`
When the same vision is run through agent slash command, MCP tool, and CLI
Then all three produce artifact files with identical Impact Chain headers, section structure, and gate results
