# Quick Reference — Vision Driven Design

One-page cheat sheet. For full details, see referenced files.

---

## The VDD Chain (8 Phases)

```
[CONSTITUTION] ── (once per project)
       ↓
[VISION] → [STRATEGY] → [TACTICS] → [SPECS] → [PLAN] → [TASKS] → [IMPLEMENT] → [VALIDATE]
  vision.md  strategy.md  tactics.md  spec.md   plan.md   tasks.md   per-task     full-chain
             + research   + repo audit           data-model           commit       drift report
             + domain                               contracts/         after each   impact verify
             primers

   L1 S     L1 T → L2 S  L2 T → L3 S  L3 T → L4 S  ...  (Goldratt recursive S&T pattern)
```

## Phase Commands

| Command | Phase | Reads | Creates |
|---------|-------|-------|---------|
| `/vdd:init` | 0 | project context | `constitution.md` |
| `/vdd:vision "statement"` | 1 | human freeform | `vdd/vision.md` |
| `/vdd:strategize` | 2 | vision.md + domain-primers | `vdd/strategy.md` |
| `/vdd:tactics` | 3 | strategy.md + repository | `vdd/tactics.md` |
| `/vdd:specify [action-item \| "description"]` | 4 | tactics.md → action item (or freeform) | `vdd/specs/[feature]/spec.md` |
| `/vdd:clarify [feature]` | 4 | spec.md | delta of resolutions and edge cases |
| `/vdd:plan [feature]` | 5 | spec.md + constitution | `plan.md`, `data-model.md`, `contracts/` |
| `/vdd:tasks [feature]` | 6 | plan.md + contracts/ | `tasks.md` |
| `/vdd:next-task [feature]` | 7 | tasks.md | next uncompleted task |
| `/vdd:implement [task-id]` | 7 | task + all artifacts | code commit |
| `/vdd:validate` | 8 | full chain + code | impact-report.md, drift report |
| `/vdd:trace` | any | all artifacts | traceability matrix |
| `/vdd:analyze [feature]` | any | spec + all specs | cross-artifact analysis |
| `/vdd:amend [what changed]` | any | full chain | updated chain from change point down |

## 7 Bi-Directional Gates

```
G1: V↔S  ───  G2: S↔T  ───  G3: T↔SP  ───  G4: SP↔PL  ───  G5: PL↔TK  ───  G6: TK↔IM  ───  G7: IM↔VS
```

Each gate: Forward check (parent→children coverage) + Backward check (children→parent authorization) + 4 S&T assumptions (Necessity, Achievability, Sufficiency, Warnings). Total: 113 checks across 7 gates.

## Impact Chain Format

```
> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006
```

Every artifact carries this header. It's the traceability backbone.

## ID Prefixes

| Prefix | Level | Example |
|--------|-------|---------|
| V- | Vision | V-001 |
| S- | Strategy | S-002 |
| T- | Tactics | T-003 |
| A- | Action Item | A-001 |
| SP- | Spec | SP-004 |
| PL- | Plan | PL-005 |
| TK- | Tasks | TK-006 |
| I- | Impact | I-001 |
| R- | Risk | R-001 |
| AC- | Acceptance Criterion | AC-1 |

## MoSCoW Labels

| Label | Meaning | Gate Impact |
|-------|---------|-------------|
| `[MUST]` | Required for vision | Fails gate if uncovered |
| `[SHOULD]` | Important, not blocking | Warning if uncovered |
| `[COULD]` | Nice to have | No gate impact |
| `[WONT]` | Explicitly excluded | Documents decision |

## Hard Rules

| Rule | Consequence of Violation |
|------|------------------------|
| Constitution before any vision | Every phase reinvents the wheel |
| Metrics in vision (measurable) | Can't verify impact |
| Research before strategy | Opinions, not strategy |
| Repo audit before tactics | Duplicated or impossible work |
| Bi-directional gates at every junction | Untraceable work, scope creep |
| Lock contracts after Plan | Drift between frontend and backend |
| Fresh context per task | Accumulated hallucinations |
| Commit after each task | Can't rollback individual task failures |
| Code must match spec (never reverse) | Spec loses value as source of truth |
| Impact verification in Validate | Ship features that don't advance the vision |

## When NOT to Use VDD

- Bug fix under 30 minutes
- Refactor with no behavior change
- Trivial config change
- Throwaway prototype
- The change doesn't relate to any vision goal

## When to Require VDD

- Any work that advances a vision goal
- Auth logic, DB schema changes, new API endpoints
- Features touching security, compliance, or data integrity
- Cross-cutting changes affecting multiple components
- New product or major feature launch

## Domain Primers

| Domain | File | Key Patterns |
|--------|------|-------------|
| WebApp | `domain-primers/webapp.md` | UX, accessibility, performance, frontend frameworks |
| Data Storage | `domain-primers/data-storage.md` | Schema design, indexing, data governance |
| ETL | `domain-primers/etl.md` | Pipeline architecture, data quality, error handling |
| Infrastructure | `domain-primers/infrastructure.md` | Deployment, CI/CD, observability, security |
| Human Factors | `domain-primers/human-factors.md` | Behavioral economics, cognitive load, habit formation (loaded unconditionally) |
| Verification Toolchain | `domain-primers/verification-toolchain.md` | Playwright, Browserless, Sentry, CI/CD pipeline (loaded unconditionally) |

## Auto-Mode Configuration

Default: fully autonomous (AI self-gates all junctions, human provides vision only).
Override in constitution.md: `## VDD Mode: gated`
Override per-project: `export VDD_MODE=gated`
