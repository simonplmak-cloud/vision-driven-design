# Vision Driven Design

**From vision to verified impact — an AI-native, fully autonomous software development methodology.**

VDD extends Spec-Driven Development with bi-directional traceability from a human's vision statement all the way to deployed, impact-verified code. Built for webapps, data storage, ETL, and infrastructure projects.

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
                   7 Bi-Directional Gates with 110 verification checks
```

## Quick Start

```bash
# 1. Install the skill (opencode)
# Copy this repo to ~/.config/opencode/skills/vision-driven-design/

# 2. Initialize your project
/vdd:init

# 3. Write your vision
/vdd:vision "I want to build a platform that connects small farmers directly
to buyers, providing transparent pricing data and fair market access. Today
they're exploited by middlemen. By cutting out intermediaries, we can increase
farmer income by 40% and help lift rural communities out of poverty."

# 4. Let it run (full-auto mode)
# AI handles: research → repo audit → specs → plan → tasks → implementation → validation
# All 7 gates are self-verified. You can intervene at any point or let it run to completion.
```

## What Makes VDD Different

| Feature | Traditional SDD | Vision Driven Design |
|---------|----------------|---------------------|
| **Starting point** | Spec document | Human vision statement |
| **Research** | Not included | 5 parallel research subagents (market, competitive, tech, impact, domain) |
| **Codebase awareness** | Not included | Full repository audit before spec generation |
| **Traceability** | Spec → Code | Vision → Strategy → Tactics → Spec → Plan → Tasks → Code → Tests → Impact |
| **Verification direction** | Forward only | Bi-directional at every level (7 gates, 110 checks) |
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
| `/vdd:specify <ID>` | Generate precise acceptance criteria from action item |
| `/vdd:plan <feature>` | Technical architecture, data model, API contracts |
| `/vdd:tasks <feature>` | Test-first task breakdown with dependencies |
| `/vdd:implement <ID>` | Execute single task, verify, commit |
| `/vdd:validate` | Full-chain traceability matrix + drift detection + impact report |
| `/vdd:trace` | Generate bidirectional traceability matrix |
| `/vdd:analyze` | Cross-artifact consistency check |
| `/vdd:amend` | Cascade requirement change through full chain |

## Domains Covered

VDD includes built-in domain research patterns:

- **WebApp** — UX, accessibility, performance budgets, framework evaluation, WCAG compliance
- **Data Storage** — Schema design, indexing, data governance, ACID vs eventual consistency
- **ETL** — Pipeline architecture, data quality frameworks, batch vs streaming
- **Infrastructure** — CI/CD, observability, security, scaling, disaster recovery

## Installation

### OpenCode
Copy this directory to `~/.config/opencode/skills/vision-driven-design/`

### Claude Code
Copy this directory to `~/.claude/skills/vision-driven-design/`

### Cursor
Copy this directory to `.cursor/skills/vision-driven-design/`

### Manual
Reference the prompts in `references/prompt-patterns.md` directly.

## Repository Structure

```
├── SKILL.md                         # Entry point
├── README.md                        # This file
├── LICENSE.md                       # MIT
├── domain-primers/                  # Domain-specific research patterns
│   ├── webapp.md
│   ├── data-storage.md
│   ├── etl.md
│   └── infrastructure.md
└── references/                      # All reference documentation
    ├── INDEX.md                     # Navigation map
    ├── quick-reference.md           # Cheat sheet
    ├── workflow-phases.md           # 8 phases step-by-step
    ├── artifact-templates.md        # 11 copy-paste templates
    ├── prompt-patterns.md           # All prompts + bidirectional gates
    ├── quality-gates.md             # 7 gates with 110 checks
    ├── ai-agent-patterns.md         # Multi-agent orchestration
    ├── anti-patterns.md             # 16 failure modes
    └── traceability-matrix.md       # RTM format + automation
```

## License

MIT — see [LICENSE.md](LICENSE.md)

## Credits

Built on:
- Goldratt's Strategy-and-Tactic Tree (recursive decomposition)
- Impact Mapping (Gojko Adzic) — goal → actors → impacts → deliverables
- GitHub Spec Kit — spec-driven development with AI agents
- NASA Systems Engineering — bidirectional traceability and verification chains
- CMMI Requirements Management — bidirectional traceability of requirements
