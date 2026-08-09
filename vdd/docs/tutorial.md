# VDD Getting Started Tutorial

*Last verified: 2026-08-10 | Time to complete: ~30 minutes*

This tutorial walks you through building a **personal task tracker** using Vision Driven Design. You'll see every phase of the VDD chain — from a human vision statement to validated, impact-traced code.

## Prerequisites

- OpenCode installed with the VDD skill ([installation guide](https://github.com/simonplmak-cloud/vision-driven-design#installation))
- A terminal and a text editor
- No paid AI subscriptions required (VDD works with any OpenCode-compatible model)

## What We're Building

A personal task tracker webapp where users can:

- Create, read, update, and delete tasks
- Mark tasks as complete
- View tasks by status

We'll use VDD's **full-auto mode** — you provide the vision, the AI handles everything else.

---

## Phase 0 — Constitution

The constitution locks in your project's technology choices and conventions. Run it once per project.

```bash
/vdd:init
```

The AI will ask about your tech stack. For this tutorial, respond with:

```
Tech stack: TypeScript, React, Next.js, PostgreSQL, Drizzle ORM
Testing: Vitest
Auth: Not needed for tutorial (public task list)
Domains: webapp, data-storage
```

**What happens:** The AI generates `constitution.md` at your project root — immutable rules for every subsequent phase. You'll see something like:

```markdown
# Project Constitution
Version: 1.0.0

## Architecture Principles
- API-first: all features expose a REST endpoint before any UI is built
- ...

## Technology Stack
| Layer | Choice |
|-------|--------|
| Language | TypeScript 5.x |
| Framework | Next.js 15+ |
| Database | PostgreSQL + Drizzle |
| Testing | Vitest |

## Domain Primitives
- webapp
- data-storage
```

> **Constitution is authoritative.** The AI cannot violate these choices in any later phase.

---

## Phase 1 — Vision

Now provide your vision. This is the **only human input** for the entire project.

```bash
/vdd:vision "I want to build a simple personal task tracker that helps people
stay organized without complexity. Too many task apps are bloated with features
nobody uses. This one should be fast, clean, and do one thing well: manage a
personal task list. Users should be able to add tasks, check them off, and move on."
```

**What happens:** The AI expands your freeform statement into a structured `vdd/vision.md`:

```markdown
# Vision
> Impact Chain: V-001

## Vision Statement
A personal task tracker that helps people stay organized without complexity...

## Impact Model
### Goal
Provide a zero-friction task management experience that users actually stick with.

### Actors
| Actor | Current State | Desired State |
|-------|--------------|---------------|
| Individual user | Overwhelmed by bloated task apps or uses paper/post-its | Uses one simple tool daily |

### Impacts
| Impact ID | Description | Measurement |
|-----------|-------------|-------------|
| I-001 | Users manage tasks digitally instead of on paper | % of users adding tasks daily |
| I-002 | Users complete tasks they create | Task completion rate |
...

## Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily active users adding tasks | >60% | Analytics event |
| Task completion rate | >70% | Completed/total tasks |
| App load time | <2s LCP | Lighthouse audit |

## Target Domains
- [x] WebApp
- [x] Data Storage
```

> **Vision is the root of all traceability.** Every artifact from here down will carry an `Impact Chain` header tracing back to V-001.

---

## Phase 2 — Strategy

The AI researches the domain, market, and technology landscape — then synthesizes a strategy.

```bash
/vdd:strategize
```

**What happens:** The AI loads domain primers for webapp and data storage, spawns parallel research subagents (market, competitive, technology, impact feasibility), and generates `vdd/strategy.md`:

```markdown
# Strategy
> Impact Chain: V-001 → S-002

## Strategic Pillars

### Pillar 1: Zero-Friction User Experience
**Rationale:** Bloat is the #1 reason users abandon task apps.
**Vision Trace:** I-001 (daily task creation)
**Key Research Finding:** Task management apps with >7 features on the home screen see
40% higher abandonment. Minimal UI is a competitive differentiator.

### Pillar 2: Reliable Data Persistence
**Rationale:** Users won't trust an app that loses their tasks.
**Vision Trace:** I-002 (task completion rate)
...

## Risk Register
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Users don't return after first session | Medium | High | Zero- friction onboarding, no signup required |
| Data loss erodes trust | Low | High | ACID-compliant Postgres, automated backups |
...
```

> **Strategy is AI-researched.** The 5 parallel subagents produced evidence-backed recommendations, not opinions.

---

## Phase 3 — Tactics

The AI audits your repository (or creates a new one), maps existing assets to strategy pillars, and produces prioritized action items.

```bash
/vdd:tactics
```

**What happens:** For a new project, the audit finds an empty repo. The gap analysis identifies what must be built. The output is `vdd/tactics.md`:

```markdown
# Tactics
> Impact Chain: V-001 → S-002 → T-003

## Codebase Audit
### What Exists
| Asset | Location | Purpose | Quality |
|-------|----------|---------|---------|
| Empty repo | `/` | Fresh project | N/A |

## Gap Analysis
| Gap | Strategic Pillar | Impact |
|-----|-----------------|--------|
| No task CRUD API | P2 (Data Persistence) | Core functionality missing |
| No web UI | P1 (UX) | Users can't interact with the app |
| No database schema | P2 | No data layer |

## Prioritized Action Items
| ID | Action Item | Priority | Strategy | Size |
|----|------------|----------|----------|------|
| A-001 | Database schema and task CRUD API | MUST | P2 | M |
| A-002 | Minimal task list UI | MUST | P1 | M |
| A-003 | Task completion toggle | MUST | P1, P2 | S |
| A-004 | Task filtering by status | SHOULD | P1 | S |
| A-005 | Deploy to production | SHOULD | P1 | S |
...
```

> **Tactics is repo-aware.** If your project already has code, the AI maps what exists to what's needed — you don't rebuild things that already work.

---

## Phase 4 — Specs

For each MUST-priority action item, the AI generates precise acceptance criteria.

```bash
/vdd:specify A-001
```

**What happens:** The AI surfaces assumptions, then generates `vdd/specs/task-crud/spec.md`:

```markdown
# Task CRUD API
> Impact Chain: V-001 → S-002 → T-003 → SP-004

## Tactical Origin
Implements: A-001 — Database schema and task CRUD API

## Acceptance Criteria

### AC-1: Create Task [MUST]
Given a valid task title
When the user submits a new task
Then a task is created with a unique ID, the provided title, and status "pending"

### AC-2: List Tasks [MUST]
Given tasks exist in the database
When the user requests their task list
Then all tasks are returned, ordered by creation date (newest first)

### AC-3: Update Task [MUST]
Given an existing task
When the user modifies the title or status
Then the task is updated with the new values

### AC-4: Delete Task [MUST]
Given an existing task
When the user deletes it
Then the task is removed from the database

### AC-E1: Invalid Input [MUST]
Given an empty or over-length task title
When the user attempts to create a task
Then a 400 error with a descriptive message is returned
...

## Boundaries
**Always do:**
- Validate all inputs before processing
- Return structured error responses
**Never do:**
- Skip validation for any input
- Expose database errors to the client
...
```

> **Repeat for each MUST action item.** Run `/vdd:specify A-002`, `/vdd:specify A-003`, etc.

Run clarify to catch ambiguities:

```bash
/vdd:clarify task-crud
```

---

## Phase 5 — Plan

Translate each spec into a technical blueprint.

```bash
/vdd:plan task-crud
```

**What happens:** The AI generates:
- `plan.md` — component architecture, technology choices
- `data-model.md` — entity schemas, indexes, migrations
- `contracts/` — API endpoint definitions (locked after this phase)

```markdown
# Technical Plan: Task CRUD
> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005

## Component Breakdown
### TaskRepository
- Responsibility: Database operations for tasks
- Location: `src/db/task-repository.ts`
- AC Coverage: AC-1, AC-2, AC-3, AC-4, AC-E1

### TaskRouter
- Responsibility: HTTP endpoints for task operations
- Location: `src/app/api/tasks/route.ts`
- AC Coverage: AC-1, AC-2, AC-3, AC-4, AC-E1

## Contracts (example — `contracts/task-api.md`)
### POST /api/tasks
**Request Body:** { "title": "string" }
**Success (201):** { "id": "uuid", "title": "...", "status": "pending", "createdAt": "..." }
**Error Codes:**
| 400 | VALIDATION_ERROR | Title is empty or >200 chars |
| 500 | INTERNAL_ERROR | Database unavailable |
...
```

> **Contracts are now LOCKED.** Changing them later requires `/vdd:amend`.

---

## Phase 6 — Tasks

Break the plan into granular, test-first tasks.

```bash
/vdd:tasks task-crud
```

```markdown
# Task List: Task CRUD
> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006

## Tasks
- [ ] TASK-001 [S] Set up database schema and migrations
  - Creates: src/db/schema.ts, src/db/migrations/
  - Depends on: none

- [ ] TASK-002 [M] Write tests for TaskRepository
  - Tests: AC-1, AC-2, AC-3, AC-4, AC-E1
  - Depends on: TASK-001

- [ ] TASK-003 [M] Implement TaskRepository
  - Contract: contracts/task-api.md
  - Satisfies: AC-1, AC-2, AC-3, AC-4, AC-E1
  - Depends on: TASK-002

- [ ] TASK-004 [M] Write tests for TaskRouter
  - Tests: AC-1, AC-2, AC-E1
  - Depends on: TASK-001

- [ ] TASK-005 [M] Implement TaskRouter
  - Contract: contracts/task-api.md
  - Satisfies: AC-1, AC-2, AC-E1
  - Depends on: TASK-004

- [ ] TASK-006 [L] Integration test: full task CRUD flow
  - Tests: AC-1 through AC-4, AC-E1
  - Depends on: TASK-003, TASK-005
```

---

## Phase 7 — Implement

Execute tasks one by one. Each task gets its own fresh AI context.

```bash
# See what's next
/vdd:next-task task-crud

# Implement the task
/vdd:implement TASK-001
```

**What happens:** The AI reads the task, relevant spec sections, contract, and plan — then generates code constrained by all of them. After implementation:

```bash
git add src/db/schema.ts src/db/migrations/
git commit -m "feat(db): TASK-001 → task schema and migrations"
```

Continue through all tasks. **Fresh context per task** prevents accumulated hallucinations.

After all tasks complete:

```bash
git log --oneline
# a1b2c3d feat(db): TASK-001 → task schema and migrations
# e4f5g6h test(db): TASK-002 → TaskRepository tests for AC-1,2,3,4,E1
# i7j8k9l feat(db): TASK-003 → TaskRepository implementation
# m0n1o2p test(api): TASK-004 → TaskRouter tests
# q3r4s5t feat(api): TASK-005 → TaskRouter implementation
# u6v7w8x test: TASK-006 → integration tests for full CRUD flow
```

> **Commit format includes full traceability.** Every commit references the task, the AC, and ultimately traces back to the vision.

---

## Phase 8 — Validate

After all tasks are implemented, verify the full chain.

```bash
/vdd:validate
```

**What happens:** The AI generates a complete traceability report:

```markdown
# Impact Verification Report

## Forward Coverage
| Parent | Children | All Covered? |
|--------|----------|-------------|
| V-001 (Vision) | S-002 (Strategy) | Yes |
| S-002 (Strategy) | T-003 (Tactics) | Yes |
| T-003 (Tactics) | SP-004 (Specs) | Yes |
| SP-004 (Specs) | PL-005 (Plan) | Yes |
| PL-005 (Plan) | TK-006 (Tasks) | Yes |
| TK-006 (Tasks) | 6 commits | Yes |

## Backward Authorization
| Child | Parent | Authorized? |
|-------|--------|-------------|
| Every commit | Task | Yes |
| Every task | Plan component | Yes |
| Every component | AC | Yes |
| Every AC | Tactical item | Yes |
| Every tactical item | Strategy pillar | Yes |
| Every pillar | Vision goal | Yes |

## AC Coverage
| AC ID | Priority | Test File | Status |
|-------|----------|-----------|--------|
| AC-1 | MUST | task-repo.test.ts | PASS |
| AC-2 | MUST | task-repo.test.ts | PASS |
| AC-3 | MUST | task-repo.test.ts | PASS |
| AC-4 | MUST | task-repo.test.ts | PASS |
| AC-E1 | MUST | task-repo.test.ts + task-router.test.ts | PASS |

## Orphan Detection
| Artifact | Status |
|----------|--------|
| (none) | — |

## Drift Report
**Zero drift detected.** All API signatures match contracts, all DB columns match data-model.

## S&T Assumption Validation
**All 28 S&T assumptions validated.** Necessity, achievability, and sufficiency confirmed at every gate.
```

> **Every line of code traces back to the vision.** The bidirectional gates ensured nothing was missed and nothing was invented.

---

## Troubleshooting

### Installation Issues

**"VDD skill not found"**
Ensure the skill directory is in the correct location:
```bash
ls ~/.config/opencode/skills/vision-driven-design/SKILL.md
```

**"Command not recognized: /vdd:init"**
Restart your OpenCode session after installing the skill.

### AI Rate Limits

If AI research subagents time out during `/vdd:strategize`, the strategy will be marked with "Research Limitations." You can:
- Re-run `/vdd:strategize` later
- Proceed with limited research (the AI will flag uncertain findings)

### Gate Failures

If a gate fails (e.g., "Gate G4: AC-3 has no plan component"), the AI attempts to self-heal:
1. AI regenerates the failing section (up to 3 attempts)
2. If self-heal fails: the AI presents the gap and asks for human direction
3. You can also run `/vdd:amend` to cascade a deliberate change

### Recovering from a Failed Implementation

If an implementation task goes wrong (wrong architecture, cascading errors):
1. Do NOT fix in the same session — accumulated context is the problem
2. Start a fresh session with only the spec artifacts as context
3. Re-implement the failing task with `/vdd:implement TASK-N`
4. The VDD chain is your recovery checkpoint — you lose at most one task

---

## Next Steps

- **Deeper dive:** Read the full [reference documentation](../references/)
- **Dogfood example:** See VDD used to build a real project (coming soon — A-002)
- **Comparison:** Read [VDD vs SDD vs vibe coding](../references/) (coming soon — A-003)
- **Contribute:** VDD is open source — [CONTRIBUTING.md](../../CONTRIBUTING.md)
- **Community:** Join the [GitHub Discussions](https://github.com/simonplmak-cloud/vision-driven-design/discussions)
