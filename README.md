# Vision Driven Design

<a href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/phases-8-blueviolet" alt="8 Phases"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/gates-7%20bidirectional-orange" alt="7 Bidirectional Gates"></a>
<a href="https://github.com/simonplmak-cloud/vision-driven-design"><img src="https://img.shields.io/badge/checks-113-green" alt="113 Verification Checks"></a>
<a href="https://opencode.ai/docs/skills/"><img src="https://img.shields.io/badge/platform-OpenCode-white" alt="OpenCode Skill"></a>

**From vision to verified impact — an AI-native, fully autonomous software development methodology.**

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Quick Start](#quick-start)
- [What Makes VDD Different](#what-makes-vdd-different)
- [Commands](#commands)
- [Installation](#installation)
- [Domains Covered](#domains-covered)
- [Repository Structure](#repository-structure)
- [Credits](#credits)
- [License](#license)

---

## The Problem

You have a vision. You know the impact you want to create. But between that vision and working code, most methodologies lose the thread:

- Requirements drift from the original intent
- Features ship without measurable impact
- Nobody can trace a line of code back to the business goal it serves
- AI coding agents generate plausible-looking code that doesn't advance the vision

## The Solution

VDD is an **8-phase, AI-driven methodology** where every artifact traces bidirectionally to the one above it and the one below it. Provide a vision statement. The AI handles the rest:

```
Vision → Strategy → Tactics → Specs → Plan → Tasks → Implement → Validate
   ↑________↓     ↑________↓    ↑_______↓   ↑______↓   ↑_______↓   ↑__________↓
                   7 Bi-Directional Gates with 113 verification checks
```

## Quick Start

```bash
# Install the skill
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  ~/.config/opencode/skills/vision-driven-design/

# Initialize your project
/vdd:init

# Write your vision — the AI handles everything from here
/vdd:vision "I want to build a platform that connects small farmers directly
to buyers, providing transparent pricing data and fair market access."

# The chain runs autonomously through all 8 phases.
# You can intervene at any gate, or let it run to completion.
```

## What Makes VDD Different

| Feature | Traditional SDD | Vision Driven Design |
|---------|----------------|---------------------|
| **Starting point** | Spec document | Human vision statement |
| **Research** | Not included | 5 parallel research subagents |
| **Codebase awareness** | Not included | Full repository audit before spec generation |
| **Traceability** | Spec → Code | Vision → Strategy → Tactics → Spec → Plan → Code → Impact |
| **Verification** | Forward only | Bi-directional at every level (7 gates, 113 checks) |
| **Impact verification** | Not included | Leading + lagging metrics validated against vision |
| **Domain awareness** | Generic | 4 domain primers (webapp, data storage, ETL, infrastructure) |
| **Autonomy** | Per-phase human gates | Full-auto mode — human provides vision only |

## Commands

| Command | What it does |
|---------|-------------|
| `/vdd:init` | Generate project constitution |
| `/vdd:vision "..."` | Expand freeform vision into structured impact model |
| `/vdd:strategize` | Research market, competitors, technology → strategic pillars |
| `/vdd:tactics` | Audit codebase → gap analysis → prioritized action items |
| `/vdd:specify <ID \| "desc">` | Generate acceptance criteria from action item or freeform (SDD-compatible) |
| `/vdd:clarify <feature>` | Standalone clarification pass on a spec |
| `/vdd:plan <feature>` | Technical architecture, data model, API contracts |
| `/vdd:tasks <feature>` | Test-first task breakdown with dependencies |
| `/vdd:next-task <feature>` | Extract next uncompleted task |
| `/vdd:implement <ID>` | Execute single task, verify, commit |
| `/vdd:validate` | Full-chain traceability matrix + drift detection + impact report |
| `/vdd:trace` | Generate bidirectional traceability matrix |
| `/vdd:analyze` | Cross-artifact consistency and conflict analysis |
| `/vdd:amend` | Cascade requirement change through full chain |

## Installation

### OpenCode
```bash
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  ~/.config/opencode/skills/vision-driven-design/
```

### Claude Code
```bash
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  ~/.claude/skills/vision-driven-design/
```

### Cursor
```bash
git clone https://github.com/simonplmak-cloud/vision-driven-design.git \
  .cursor/skills/vision-driven-design/
```

## Domains Covered

VDD includes built-in domain research patterns — loaded automatically during the Strategy phase based on your vision:

- **WebApp** — UX, accessibility, performance budgets, framework evaluation, WCAG compliance
- **Data Storage** — Schema design, indexing, data governance, ACID vs eventual consistency
- **ETL** — Pipeline architecture, data quality frameworks, batch vs streaming
- **Infrastructure** — CI/CD, observability, security, scaling, disaster recovery

## Repository Structure

```
├── SKILL.md                         # Entry point — loaded by OpenCode
├── AGENTS.md                        # Instructions for AI agents working on this repo
├── README.md                        # This file
├── LICENSE.md                       # MIT
├── domain-primers/                  # Domain-specific research patterns (loaded during Strategy)
│   ├── webapp.md
│   ├── data-storage.md
│   ├── etl.md
│   └── infrastructure.md
└── references/                      # All reference documentation
    ├── INDEX.md                     # Navigation map
    ├── quick-reference.md           # 1-page cheat sheet
    ├── workflow-phases.md           # 8 phases step-by-step (authoritative)
    ├── artifact-templates.md        # 11 copy-paste templates (authoritative)
    ├── prompt-patterns.md           # All prompts + bidirectional gate verification
    ├── quality-gates.md             # 7 gates with 113 checks
    ├── ai-agent-patterns.md         # Multi-agent orchestration and auto-mode
    ├── anti-patterns.md             # 23 failure modes and fixes
    └── traceability-matrix.md       # RTM format + CI/CD automation
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
