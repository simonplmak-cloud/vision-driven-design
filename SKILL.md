---
name: vision-driven-design
description: >
  Use when starting webapp, data storage, ETL, or infrastructure projects where you want
  AI agents to drive the full development pipeline from a human-provided vision all the
  way to validated, impact-verified code. VDD extends Spec-Driven Development (SDD) by
  adding Vision, Strategy, and Tactics phases above the spec chain, with bi-directional
  verification gates at every junction. MCP server available at vdd.simonmak.com.
  Keywords: vision-driven, VDD, impact-first, strategy-to-code, bi-directional traceability,
  Goldratt S&T, impact mapping, autonomous development, vision to code, requirements
  chain, verification chain, full-stack planning, webapp design, ETL, data storage,
  infrastructure, spec-driven, SDD, specification-first, MCP, compliance.
metadata:
  domain: full-stack
  audience: developers-product-managers-architects
  compatibility: opencode
license: MIT
---

# Vision Driven Design

From vision to verified impact — an AI-native, fully autonomous software development methodology. Provide a human vision statement. The AI autonomously researches, audits your codebase, generates specs and plans, implements, and validates — with bi-directional verification at every junction.

Core principle: *"Every line of code must answer two questions: 'What vision goal do I serve?' and 'Why am I necessary to achieve it?'"*

VDD extends and absorbs Spec-Driven Development (SDD). SDD's `Specs → Plan → Tasks → Implement → Validate` chain is preserved, but VDD adds three upstream phases (Vision, Strategy, Tactics) that ground every spec in measurable real-world impact. The combined 8-phase chain is governed by Goldratt's recursive Strategy-Tactic decomposition.

---

## Quick Start

1. **Write your vision** (2 minutes): 1-3 paragraphs describing the impact you want to create. Be broad. The AI handles the rest.

2. **Let the chain run**: `/vdd:vision "I want to build a platform that..."` — AI expands, researches, audits your codebase, generates specs, plans, tasks, and implements.

3. **Review at the end**: `/vdd:validate` produces a full-chain traceability matrix and impact verification report.

## MCP Server

Available as a public MCP server — 14 tools, SSE + JSON-RPC 2.0, no API key.

**OpenCode** — add to `opencode.json`:
```json
"vdd": { "type": "remote", "url": "https://vdd.simonmak.com/api/sse", "timeout": 120000 }
```

**Claude Desktop** — add to `claude_desktop_config.json`:
```json
"vdd": { "command": "npx", "args": ["-y", "@vdd/mcp"], "type": "stdio" }
```

**Cursor** — add MCP server URL: `https://vdd.simonmak.com/api/sse`

**Any SSE-compatible agent** — endpoint: `https://vdd.simonmak.com/api/sse`

---

## The 8-Phase Chain

```
Vision ←──→ Strategy ←──→ Tactics ←──→ Specs ←──→ Plan ←──→ Tasks ←──→ Implement ←──→ Validate
  │           │            │          │        │         │           │            │
vision.md  strategy.md  tactics.md  spec.md  plan.md  tasks.md    code       impact-report
(human      (research    (repo       (SDD     (SDD     (SDD        (SDD        (full-chain
 input)     + domain     audit)      absorb)  absorb)  absorb)     absorb)     drift report)
            primers)
```

| # | Phase | Human Role | AI Role |
|---|-------|-----------|---------|
| 0 | Constitution | Provide tech stack, conventions | Generate immutable project rules |
| 1 | Vision | Write 1-3 paragraph impact statement | Expand into structured vision.md |
| 2 | Strategy | (optional: redirect) | Spawn 5 parallel research subagents, synthesize findings |
| 3 | Tactics | (optional: re-prioritize) | Full repo audit → gap analysis → 38 action items |
| 4 | Specs | (optional: clarify ambiguities) | Generate acceptance criteria per action item. Also accepts freeform via `/vdd:specify "description"` — skips V/S/T. |
| 5 | Plan | (optional: review architecture) | Technical design, data models, API contracts |
| 6 | Tasks | (optional: adjust ordering) | Break plan into test-first atomic tasks |
| 7 | Implement | (optional: review PRs) | Execute tasks one by one, fresh context per task |
| 8 | Validate | Review impact report | Full-chain traceability + drift detection + impact verification |

**Full-auto mode (default):** human provides only the Vision. AI handles everything else, including self-gating all 7 bidirectional verification gates.

---

## 7 Bi-Directional Gates

Each gate verifies both directions and validates 4 S&T assumptions:

| Gate | Forward Check | Backward Check |
|------|--------------|----------------|
| **G1 (V→S)** | Every vision goal has ≥1 strategy pillar | Every pillar traces to a vision goal |
| **G2 (S→T)** | Every pillar has ≥1 tactical action item | Every action item traces to a pillar |
| **G3 (T→SP)** | Every MUST action item has a spec | Every AC traces to an action item |
| **G4 (SP→PL)** | Every AC has ≥1 plan component | Every component traces to an AC |
| **G5 (PL→TK)** | Every component has ≥1 task | Every task traces to a component |
| **G6 (TK→IM)** | Every task produces passing code | Every commit traces to a task |
| **G7 (IM→VS)** | Every MUST AC has passing tests | Every code artifact traces to vision |

**113 total checks** (47 forward + 38 backward + 28 S&T assumptions).

---

## Command Reference

| Command | Phase | Action |
|---------|-------|--------|
| `/vdd:init` | 0 | Generate `constitution.md` from project context |
| `/vdd:vision "statement"` | 1 | Expand freeform vision → structured `vision.md` |
| `/vdd:strategize` | 2 | Load domain primers, spawn research subagents, synthesize `strategy.md` |
| `/vdd:tactics` | 3 | Audit repo, gap analysis, generate `tactics.md` |
| `/vdd:specify <action-item-id \| "freeform description">` | 4 | Generate `spec.md` from tactical action item or freeform |
| `/vdd:clarify <feature>` | 4 | Standalone clarification pass on a spec |
| `/vdd:plan <feature>` | 5 | Generate `plan.md`, `data-model.md`, `contracts/` |
| `/vdd:tasks <feature>` | 6 | Generate `tasks.md` with test-first ordering |
| `/vdd:next-task <feature>` | 7 | Extract next uncompleted task from tasks.md |
| `/vdd:implement <task-id>` | 7 | Execute a single task, verify, commit |
| `/vdd:validate` | 8 | Full-chain traceability, drift detection, impact verification |
| `/vdd:trace` | any | Generate bidirectional traceability matrix |
| `/vdd:analyze <feature>` | any | Cross-artifact consistency and conflict analysis |
| `/vdd:amend "what changed"` | any | Cascade a requirement change through the full chain |

---

## Domain Primers

VDD is domain-aware. During Phase 2 (Strategy), domain-specific research patterns are loaded based on the vision's target domains:

| Primer | When Loaded | Contains |
|--------|------------|----------|
| `domain-primers/human-factors.md` | Every project (unconditional) | Behavioral economics, cognitive load, habit formation |
| `domain-primers/verification-toolchain.md` | Every project (unconditional) | Playwright, Browserless, Sentry, CI/CD quality pipeline |
| `domain-primers/webapp.md` | Vision targets web applications | UX, accessibility, performance, framework evaluation |
| `domain-primers/data-storage.md` | Vision involves persistent data | Schema design, indexing, data governance |
| `domain-primers/etl.md` | Vision involves data pipelines | Pipeline architecture, data quality, streaming vs batch |
| `domain-primers/infrastructure.md` | Vision involves deployment/platform | CI/CD, observability, security, scaling, disaster recovery |
| `domain-primers/safety-critical.md` | Vision involves aerospace/medical/automotive | FMEA/FTA, safety integrity levels (DO-178C/IEC 62304) |

---

## Directory Structure

```
constitution.md                    # Project-level immutable rules (Phase 0)

vdd/
  vision.md                        # Phase 1 — Vision statement, impact model, 17 impacts
  strategy.md                      # Phase 2 — Research synthesis, 12 strategic pillars, risk register
  tactics.md                       # Phase 3 — Codebase audit, gap analysis, 38 action items
  impact-report.md                 # Phase 8 — Full-chain traceability and impact verification
  specs/
    [feature]/
      spec.md                      # Phase 4 — Requirements with MoSCoW priorities
      plan.md                      # Phase 5 — Technical architecture and component breakdown
      data-model.md                # Phase 5 — Entities, fields, relationships, migrations
      contracts/                   # Phase 5 — API contracts
      tasks.md                     # Phase 6 — Atomic test-first task list
```

---

## Reference Index

| Need | File |
|------|------|
| Templates for all 11 artifact types | `references/artifact-templates.md` |
| Prompts for every phase + bidirectional gates | `references/prompt-patterns.md` |
| Step-by-step phase instructions | `references/workflow-phases.md` |
| 7 bidirectional gates with 113 total checks | `references/quality-gates.md` |
| Multi-agent patterns and auto-mode execution | `references/ai-agent-patterns.md` |
| 24 common failure modes and fixes | `references/anti-patterns.md` |
| RTM format, generation, and CI/CD integration | `references/traceability-matrix.md` |
| One-page cheat sheet | `references/quick-reference.md` |
| Topic navigation | `references/INDEX.md` |
| Compliance evidence templates | `references/compliance-evidence.md` |
| Domain-specific research patterns | `domain-primers/*.md` |

## MCP & Packages

The public MCP server at `vdd.simonmak.com/api/sse` and the TypeScript packages are in this repo:
- `api/sse.js` — deployed Vercel handler (14 tools)
- `packages/vdd-engine/` — shared core (14 phase functions)
- `packages/vdd-mcp/` — MCP server (14 tools, stdio + SSE)
- `packages/vdd-cli/` — CLI binary (14 subcommands, `--json`)