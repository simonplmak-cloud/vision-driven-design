# Vision Driven Design

<a href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/phases-8-blueviolet" alt="8 Phases"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/version-1.5.5-blue" alt="Version 1.5.5"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/gates-7%20bidirectional-orange" alt="7 Bidirectional Gates"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/checks-108-green" alt="108 Verification Checks"></a>
<a href="https://vdd.simonmak.com"><img src="https://img.shields.io/badge/API-vdd.simonmak.com-0d7377" alt="MCP API"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/built%20with-VDD-0d7377" alt="Built with VDD"></a>

**From vision to verified impact — an AI-native, fully autonomous software development methodology.**

Provide a human vision statement. The AI autonomously researches, audits your codebase, generates specs and plans, implements, and validates — with **bi-directional verification** at every junction to ensure nothing is missed or invented.

---

```mermaid
graph LR
    V[1. Vision<br/>Human Input] -->|<-->| S[2. Strategy<br/>AI Research]
    S -->|<-->| T[3. Tactics<br/>AI Audit]
    T -->|<-->| SP[4. Specs<br/>SDD]
    SP -->|<-->| PL[5. Plan]
    PL -->|<-->| TK[6. Tasks]
    TK -->|<-->| IM[7. Implement]
    IM -->|<-->| VS[8. Validate<br/>Impact Verified]

    style V fill:#4CAF50,color:#fff
    style S fill:#2196F3,color:#fff
    style T fill:#FF9800,color:#fff
    style SP fill:#9C27B0,color:#fff
    style VS fill:#4CAF50,color:#fff
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Commands](#commands)
- [Installation](#installation)
- [MCP API](#mcp-api)
- [Domains Covered](#domains-covered)
- [Best-Practice Benchmark](#best-practice-benchmark)
- [Documentation](#documentation)
- [Repository Structure](#repository-structure)
- [Credits](#credits)
- [License](#license)

---

## Quick Start

```bash
# One-line install
curl -sSL https://raw.githubusercontent.com/simonplmak-cloud/vision-driven-design/main/scripts/install.sh | bash
```

Then in your project:

```bash
/vdd:init                          # Generate project constitution
/vdd:vision "your vision here"     # The only human input required

# Or run end-to-end in one command:
/vdd:e2e "your vision here"        # Full chain: init→vision→...→validate
```

The AI handles the rest — researching, auditing, generating specs, planning, implementing, and validating — with self-gating at 7 bi-directional verification junctions.

**[Tutorial →](vdd/docs/tutorial.md)** — 30-minute walkthrough building a real project.

```bash
# Want human gates? Add to constitution.md:
## VDD Mode: gated
```

---

## How It Works

VDD follows Goldratt's **recursive Strategy-Tactic decomposition**: every phase is simultaneously the **Tactic** for its parent and the **Strategy** for its child.

| Phase | S&T Role | Output |
|-------|----------|--------|
| **0. Constitution** | (pre-chain) | `constitution.md` — Immutable project rules |
| **1. Vision** | L1 Strategy: What impact? | `vision.md` — Impact model, success metrics |
| **2. Strategy** | L1 Tactic → L2 Strategy | `strategy.md` — Research, 12 pillars, risk register |
| **3. Tactics** | L2 Tactic → L3 Strategy | `tactics.md` — Codebase audit, 38 action items |
| **4. Specs** | L3 Tactic → L4 Strategy | `spec.md` — MoSCoW acceptance criteria |
| **5. Plan** | L4 Tactic → L5 Strategy | `plan.md`, `data-model.md`, `contracts/` |
| **6. Tasks** | L5 Tactic → L6 Strategy | `tasks.md` — Test-first atomic tasks |
| **7. Implement** | L6 Tactic → L7 Strategy | Code — Per-task commits with full traceability |
| **8. Validate** | L7 Tactic — Did it work? | `impact-report.md` — Drift + impact verification |

**7 bi-directional gates** verify both directions at every junction (108 total checks). Each gate validates 4 S&T assumptions: Necessity, Achievability, Sufficiency, Warnings.

Every code commit traces back to the original vision statement:
```
V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → commit
```

---

## Commands

| Command | Phase | Action |
|---------|-------|--------|
| `/vdd:init` | 0 | Generate `constitution.md` from project context |
| `/vdd:vision "statement"` | 1 | Expand freeform vision → structured `vision.md` |
| `/vdd:strategize` | 2 | Load domain primers, spawn research subagents, synthesize `strategy.md` |
| `/vdd:tactics` | 3 | Audit repo → gap analysis → `tactics.md` |
| `/vdd:specify <ID \| "desc">` | 4 | Generate `spec.md` (or freeform — skips V/S/T) |
| `/vdd:clarify <feature>` | 4 | Clarification pass on a spec |
| `/vdd:plan <feature>` | 5 | Generate `plan.md`, `data-model.md`, `contracts/` |
| `/vdd:tasks <feature>` | 6 | Generate `tasks.md` |
| `/vdd:next-task <feature>` | 7 | Extract next uncompleted task |
| `/vdd:implement <task-id>` | 7 | Execute single task, verify, commit |
| `/vdd:validate` | 8 | Full-chain traceability + drift + impact report |
| `/vdd:trace` | any | Bidirectional traceability matrix |
| `/vdd:analyze <feature>` | any | Cross-artifact consistency analysis |
| `/vdd:amend "what changed"` | any | Cascade requirement change through full chain |
| `/vdd:e2e "vision statement"` | 0–8 | **End-to-end**: run full 8-phase chain in one call, writes all 10+ template files |

---

## Installation

```bash
# OpenCode
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  ~/.config/opencode/skills/vision-driven-design/

# Claude Code
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  ~/.claude/skills/vision-driven-design/

# Cursor
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  .cursor/skills/vision-driven-design/
```

---

## MCP API

VDD is available as a public MCP server at `https://vdd.simonmak.com/api/sse`. 15 tools, SSE transport with JSON-RPC 2.0, no API key required.

### Agent Configuration

**OpenCode** — add to `opencode.json`:
```json
"vdd": {
  "type": "remote",
  "url": "https://vdd.simonmak.com/api/sse",
  "timeout": 120000
}
```

**Claude Desktop** — add to `claude_desktop_config.json`:
```json
"vdd": {
  "command": "npx",
  "args": ["-y", "@vdd/mcp"],
  "type": "stdio"
}
```

**Cursor** — add MCP server URL: `https://vdd.simonmak.com/api/sse`

**Any SSE-compatible agent** — endpoint: `https://vdd.simonmak.com/api/sse`

### Tools (15)

`vdd_init`, `vdd_vision`, `vdd_strategize`, `vdd_tactics`, `vdd_specify`, `vdd_clarify`, `vdd_plan`, `vdd_tasks`, `vdd_next_task`, `vdd_implement`, `vdd_validate`, `vdd_trace`, `vdd_analyze`, `vdd_amend`, `vdd_e2e`.

All tools accept: `statement`, `projectRoot`, `actionItemId`, `feature`, `taskId`, `description`.

### API Reference

| Method | Description |
|--------|-------------|
| GET `/api/sse` | SSE stream (MCP client) or HTML docs (browser) |
| POST `/api/sse` | JSON-RPC — `initialize`, `tools/list`, `tools/call` |

```bash
# JSON-RPC call example
curl -X POST https://vdd.simonmak.com/api/sse \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"vdd_validate","arguments":{"projectRoot":"."}},"id":1}'
```

The full TypeScript engine (`packages/vdd-engine`, `packages/vdd-mcp`, `packages/vdd-cli`) is included in this repo.

---

## Domains Covered

VDD loads domain-specific research patterns during the Strategy phase based on your vision:

| Domain | What it covers |
|--------|---------------|
| **WebApp** | UX, accessibility (WCAG 2.2), performance budgets, framework evaluation |
| **Data Storage** | Schema design, indexing strategy, data governance, ACID vs eventual |
| **ETL** | Pipeline architecture, data quality, batch vs streaming |
| **Infrastructure** | CI/CD, observability, security, scaling, disaster recovery |
| **Human Factors** | Behavioral economics, cognitive load, habit formation, accessibility cognition |
| **Verification Toolchain** | Playwright, Browserless, Sentry, CI/CD quality pipeline |
| **Safety-Critical** | FMEA/FTA, DO-178C/IEC 62304 safety integrity levels |

`human-factors.md` and `verification-toolchain.md` are loaded unconditionally for every project.

---

## Best-Practice Benchmark

VDD is benchmarked against NASA SE, CMMI REQM, DO-178C, IEC 62304, DORA, ISO 29148, and GitHub Spec Kit:

**47/47 criteria matched (100%), 11 exceeded, 0 gaps.**

[Full benchmark matrix →](vdd/docs/best-practice-benchmark.md) | [Compliance evidence templates →](references/compliance-evidence.md)

---

## Documentation

| File | Contents |
|------|----------|
| [`SKILL.md`](SKILL.md) | Full command reference and workflow |
| [`vdd/docs/tutorial.md`](vdd/docs/tutorial.md) | 30-minute walkthrough |
| [`vdd/docs/comparison.md`](vdd/docs/comparison.md) | VDD vs SDD vs vibe coding vs TDD |
| [`vdd/docs/best-practice-benchmark.md`](vdd/docs/best-practice-benchmark.md) | Standards alignment matrix |
| [`references/workflow-phases.md`](references/workflow-phases.md) | Step-by-step phase instructions (authoritative) |
| [`references/artifact-templates.md`](references/artifact-templates.md) | Copy-paste templates for all 11 artifacts |
| [`references/quality-gates.md`](references/quality-gates.md) | 7 gates with 108 checks + CI/CD |
| [`references/anti-patterns.md`](references/anti-patterns.md) | 24 failure modes and fixes |
| [`references/compliance-evidence.md`](references/compliance-evidence.md) | DO-178C/IEC 62304/CMMI/ISO 29148 evidence maps |
| [`references/quick-reference.md`](references/quick-reference.md) | One-page cheat sheet |

---

## Repository Structure

```
├── SKILL.md                         # Entry point — loaded by OpenCode
├── README.md                        # This file
├── AGENTS.md                        # Instructions for AI agents
├── constitution.md                  # Project constitution (dogfooded)
├── CHANGELOG.md                     # Versioned change history
├── CONTRIBUTING.md                  # Contribution guidelines
├── LICENSE.md                       # MIT
├── index.html                       # GitHub Pages landing page
├── pnpm-workspace.yaml              # Workspace config
├── package.json                     # Root package (Vercel + workspace)
├── vercel.json                      # Vercel deployment config
├── domain-primers/                  # 7 domain research patterns
│   ├── webapp.md
│   ├── data-storage.md
│   ├── etl.md
│   ├── infrastructure.md
│   ├── human-factors.md             # Loaded unconditionally
│   ├── verification-toolchain.md    # Loaded unconditionally
│   └── safety-critical.md           # FMEA/FTA, DO-178C/IEC 62304
├── references/                      # 10 authoritative reference docs
│   ├── INDEX.md                     # Navigation map
│   ├── quick-reference.md           # 1-page cheat sheet
│   ├── workflow-phases.md           # Phase order (authoritative)
│   ├── artifact-templates.md        # 11 artifact templates (authoritative)
│   ├── prompt-patterns.md           # AI prompts (authoritative)
│   ├── quality-gates.md             # 7 gates + 108 checks (authoritative)
│   ├── ai-agent-patterns.md         # Agent orchestration (authoritative)
│   ├── anti-patterns.md             # 24 failure modes (authoritative)
│   ├── traceability-matrix.md       # RTM format + CI/CD
│   └── compliance-evidence.md       # Evidence maps
├── vdd/                             # VDD chain artifacts
│   ├── vision.md                    # Vision, impact model, 17 impacts
│   ├── strategy.md                  # 12 strategic pillars
│   ├── tactics.md                   # 38 action items (all DONE)
│   ├── impact-report.md             # Full-chain traceability + drift
│   ├── docs/                        # 16 guides and references
│   └── specs/                       # 3 feature specs
├── packages/                        # TypeScript monorepo
│   ├── vdd-engine/                  # Shared core — 15 phase functions
│   ├── vdd-mcp/                     # MCP server — 15 tools, stdio + SSE
│   └── vdd-cli/                     # CLI binary — 15 subcommands
├── api/                             # Vercel MCP endpoint
│   └── sse.js                       # MCP SSE + JSON-RPC 2.0 handler
├── scripts/                         # 4 installer/helper scripts
└── .github/                         # GitHub config
    ├── CODEOWNERS
    ├── ISSUE_TEMPLATE/
    └── workflows/
```

## Credits

Built on:
- **Goldratt's Strategy-and-Tactic Tree** — recursive decomposition at every phase
- **Impact Mapping** (Gojko Adzic) — goal → actors → impacts → deliverables
- **GitHub Spec Kit** — spec-driven development with AI agents
- **NASA Systems Engineering** — bidirectional traceability and verification chains
- **CMMI Requirements Management** — bidirectional traceability of requirements

## License

MIT — see [LICENSE.md](LICENSE.md)
