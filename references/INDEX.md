# Reference Index

Navigation map for all VDD reference files.

---

## By Topic

### Getting Started
- Overview and philosophy → `../SKILL.md`
- Quick Start → `../SKILL.md#quick-start`
- One-page cheat sheet → `quick-reference.md`
- GitHub README → `../README.md`

### Templates (copy-paste ready)
- constitution.md template → `artifact-templates.md#constitutionmd-template`
- vision.md template → `artifact-templates.md#visionmd-template`
- strategy.md template → `artifact-templates.md#strategymd-template`
- tactics.md template → `artifact-templates.md#tacticsmd-template`
- spec.md template (VDD-enhanced) → `artifact-templates.md#specmd-template`
- plan.md template (VDD-enhanced) → `artifact-templates.md#planmd-template`
- data-model.md template → `artifact-templates.md#data-modelmd-template`
- contracts/[endpoint].md template → `artifact-templates.md#contractsendpointmd-template`
- tasks.md template → `artifact-templates.md#tasksmd-template`
- Impact Verification Report template → `artifact-templates.md#impact-verification-report-template`

### Prompts (copy-paste ready)
- Phase 0 — Constitution prompts → `prompt-patterns.md#phase-0--constitution-prompts`
- Phase 1 — Vision expansion + self-check → `prompt-patterns.md#phase-1--vision-prompts`
- Phase 2 — Domain primer loading + parallel research dispatch + synthesis → `prompt-patterns.md#phase-2--strategy-prompts`
- Phase 2 — Gate G1 (V→S) bidirectional verification → `prompt-patterns.md#bi-directional-gate-g1-prompt`
- Phase 3 — Repository audit + tactics generation → `prompt-patterns.md#phase-3--tactics-prompts`
- Phase 3 — Gate G2 (S→T) bidirectional verification → `prompt-patterns.md#bi-directional-gate-g2-prompt`
- Phase 4 — Spec assumptions + generation + clarify + Gate G3 → `prompt-patterns.md#phase-4--specs-prompts`
- Phase 5 — Plan generation + Gate G4 → `prompt-patterns.md#phase-5--plan-prompts`
- Phase 6 — Task breakdown + Gate G5 → `prompt-patterns.md#phase-6--tasks-prompts`
- Phase 7 — Implementation + Gate G6 → `prompt-patterns.md#phase-7--implement-prompts`
- Phase 8 — Traceability matrix + drift detection + impact verification + Gate G7 → `prompt-patterns.md#phase-8--validate-prompts`
- Cross-phase — Analyze + Amend → `prompt-patterns.md#cross-phase-prompts`
- Multi-agent review (critic agents) → `prompt-patterns.md#multi-agent-review-pattern`

### Phase Details (step-by-step)
- Phase 0 — Constitution → `workflow-phases.md#phase-0--constitution`
- Phase 1 — Vision → `workflow-phases.md#phase-1--vision`
- Phase 2 — Strategy → `workflow-phases.md#phase-2--strategy`
- Phase 3 — Tactics → `workflow-phases.md#phase-3--tactics`
- Phase 4 — Specs → `workflow-phases.md#phase-4--specs`
- Phase 5 — Plan → `workflow-phases.md#phase-5--plan`
- Phase 6 — Tasks → `workflow-phases.md#phase-6--tasks`
- Phase 7 — Implement → `workflow-phases.md#phase-7--implement`
- Phase 8 — Validate → `workflow-phases.md#phase-8--validate`
- Amend workflow → `workflow-phases.md#amend-workflow-vddamend`
- S&T mapping summary → `workflow-phases.md#phase-to-st-mapping-summary`

### Quality and Review
- All 7 bidirectional gate checklists → `quality-gates.md`
- Gate 0 — Constitution → `quality-gates.md#gate-0--constitutionmd-approval`
- Gate 1 — Vision→Strategy → `quality-gates.md#gate-1--vision--strategy`
- Gate 2 — Strategy→Tactics → `quality-gates.md#gate-2--strategy--tactics`
- Gate 3 — Tactics→Specs → `quality-gates.md#gate-3--tactics--specs`
- Gate 4 — Specs→Plan → `quality-gates.md#gate-4--specs--plan`
- Gate 5 — Plan→Tasks → `quality-gates.md#gate-5--plan--tasks`
- Gate 6 — Tasks→Implement → `quality-gates.md#gate-6--tasks--implementation`
- Gate 7 — Implement→Validate → `quality-gates.md#gate-7--implementation--validation`
- Confidence-based review thresholds → `quality-gates.md#confidence-based-review-thresholds`
- CI/CD integration → `quality-gates.md#cicd-integration`

### AI and Agent Patterns
- Recursive S&T pattern → `ai-agent-patterns.md#the-recursive-st-pattern`
- Context management → `ai-agent-patterns.md#context-management`
- Parallel research subagents (Phase 2) → `ai-agent-patterns.md#parallel-research-subagents-phase-2--strategy`
- Bidirectional verification agent pairs → `ai-agent-patterns.md#bidirectional-verification-agent-pairs`
- Critic roles by phase → `ai-agent-patterns.md#critic-roles-by-phase`
- Parallel task execution (Phase 7) → `ai-agent-patterns.md#parallel-task-execution-phase-7`
- AI tool selection per phase → `ai-agent-patterns.md#ai-tool-selection-per-phase`
- Handling AI resistance → `ai-agent-patterns.md#handling-ai-resistance-spec-drift`
- Spec as recovery point → `ai-agent-patterns.md#spec-as-recovery-point`
- Auto-mode execution → `ai-agent-patterns.md#auto-mode-execution`

### Traceability
- RTM structure → `traceability-matrix.md#rtm-structure`
- Matrix format → `traceability-matrix.md#matrix-format`
- Automated generation algorithm → `traceability-matrix.md#automated-rtm-generation`
- CI/CD integration → `traceability-matrix.md#cicd-integration-1`
- Traceability ID format → `traceability-matrix.md#traceability-id-format`
- Quick trace query patterns → `traceability-matrix.md#quick-trace-query-patterns`

### Troubleshooting
- All anti-patterns → `anti-patterns.md`
- Vision without metrics → `anti-patterns.md#anti-pattern-1-vision-without-metrics`
- Strategy without research → `anti-patterns.md#anti-pattern-2-strategy-without-research`
- Tactics without codebase audit → `anti-patterns.md#anti-pattern-3-tactics-without-codebase-audit`
- Skipping bidirectional gates → `anti-patterns.md#anti-pattern-4-skipping-the-bi-directional-gates`
- Impact chain breaks → `anti-patterns.md#anti-pattern-7-impact-chain-breaks-mid-chain`
- Validation without impact verification → `anti-patterns.md#anti-pattern-11-validation-without-impact-verification`
- Domain primers ignored → `anti-patterns.md#anti-pattern-12-domain-primers-ignored`
- Spec with implementation details → `anti-patterns.md#anti-pattern-17-spec-with-implementation-details`
- Vague acceptance criteria → `anti-patterns.md#anti-pattern-18-vague-acceptance-criteria`
- Missing error cases in contracts → `anti-patterns.md#anti-pattern-19-missing-error-cases-in-contracts`
- Treating AI like a mind reader → `anti-patterns.md#anti-pattern-20-treating-ai-like-a-mind-reader`
- Skipping the clarify step → `anti-patterns.md#anti-pattern-21-skipping-the-clarify-step`
- Tasks without AC references → `anti-patterns.md#anti-pattern-22-tasks-without-ac-references`
- Oversized tasks → `anti-patterns.md#anti-pattern-23-oversized-tasks`

### Domain Primers
- WebApp → `../domain-primers/webapp.md`
- Data Storage → `../domain-primers/data-storage.md`
- ETL → `../domain-primers/etl.md`
- Infrastructure → `../domain-primers/infrastructure.md`

---

## By Phase

| Phase | Templates | Prompts | Details | Quality |
|-------|-----------|---------|---------|---------|
| 0 — Constitution | constitution.md | constitution-prompts | workflow-phases#phase-0 | Gate 0 |
| 1 — Vision | vision.md | vision-prompts | workflow-phases#phase-1 | (completeness self-check) |
| 2 — Strategy | strategy.md | strategy-prompts + G1 | workflow-phases#phase-2 | Gate 1 |
| 3 — Tactics | tactics.md | tactics-prompts + G2 | workflow-phases#phase-3 | Gate 2 |
| 4 — Specs | spec.md | specs-prompts + G3 | workflow-phases#phase-4 | Gate 3 |
| 5 — Plan | plan.md, data-model.md, contracts | plan-prompts + G4 | workflow-phases#phase-5 | Gate 4 |
| 6 — Tasks | tasks.md | tasks-prompts + G5 | workflow-phases#phase-6 | Gate 5 |
| 7 — Implement | — | implement-prompts + G6 | workflow-phases#phase-7 | Gate 6 |
| 8 — Validate | impact-report.md | validate-prompts + G7 | workflow-phases#phase-8 | Gate 7 |

---

## File List

| File | Purpose | Size |
|------|---------|------|
| `../SKILL.md` | Entry point, workflow overview | Long |
| `../README.md` | GitHub README | Medium |
| `artifact-templates.md` | Copy-paste templates for all 11 artifacts | Long |
| `prompt-patterns.md` | Prompts for every phase + bidirectional gates | Long |
| `workflow-phases.md` | Step-by-step phase instructions | Long |
| `quality-gates.md` | 7 gates with 110 total checks | Medium |
| `ai-agent-patterns.md` | Multi-agent patterns and auto-mode execution | Medium |
| `anti-patterns.md` | 16 failure modes and fixes | Medium |
| `traceability-matrix.md` | RTM format, generation, CI/CD | Medium |
| `quick-reference.md` | One-page cheat sheet | Short |
| `INDEX.md` | This file | Medium |
| `../domain-primers/webapp.md` | WebApp research + impact verification patterns | Medium |
| `../domain-primers/data-storage.md` | Data Storage research patterns | Medium |
| `../domain-primers/etl.md` | ETL research patterns | Medium |
| `../domain-primers/infrastructure.md` | Infrastructure research patterns | Medium |
