# AGENTS.md — Vision Driven Design Skill

This is an **OpenCode AI skill repository** — static documentation, not an application.

## Directory Map

```
SKILL.md                 ← Entry point loaded by OpenCode. YAML frontmatter with name, description, keywords.
README.md                ← GitHub landing page. Keep in sync with SKILL.md overview and command table.
domain-primers/           ← Loaded during Phase 2 (Strategy) based on vision's target domains.
references/               ← All detailed reference docs. SKILL.md's "Reference Index" links into here.
  INDEX.md                ← Navigation map; update when adding/renaming reference files.
  artifact-templates.md   ← Authoritative source for all artifact structures (vision, strategy, tactics, spec, plan, data-model, contracts, tasks, impact-report).
  workflow-phases.md      ← Authoritative source for phase order and step-by-step instructions.
  prompt-patterns.md      ← Authoritative source for all AI prompts (generation + gate verification).
  quality-gates.md        ← Authoritative source for gate checklists, counts, and CI/CD snippets.
  ai-agent-patterns.md    ← Authoritative source for agent orchestration, parallel execution, context management.
  quick-reference.md      ← Derived from the sources above. Update counts and commands here when sources change.
```

## File Roles — Authoritative Sources

Each concept has one canonical source. If you need to update something, update the source, then propagate.

| Concept | Canonical Source | Derived Copies |
|---------|-----------------|----------------|
| Artifact structures | `artifact-templates.md` | SKILL.md directory structure section |
| Phase steps | `workflow-phases.md` | SKILL.md phase summary |
| Prompts | `prompt-patterns.md` | ai-agent-patterns.md (references them) |
| Gate checks and counts | `quality-gates.md` | SKILL.md, README.md, quick-reference.md |
| Anti-patterns | `anti-patterns.md` | INDEX.md troubleshooting section |
| Commands | SKILL.md | README.md, quick-reference.md |

## Conventions

### Impact Chain Headers
Every artifact template includes this format:
```
> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006
```
IDs follow these prefixes: `V-` (Vision), `S-` (Strategy), `T-` (Tactics), `A-` (Action Item), `SP-` (Spec), `PL-` (Plan), `TK-` (Tasks), `I-` (Impact), `R-` (Risk), `AC-` (Acceptance Criterion).

### Bi-Directional Gates
Every junction between phases has a bidirectional gate. Each gate has: forward checks (parent→children), backward checks (children→parent), and 4 S&T assumptions (Necessity, Achievability, Sufficiency, Warnings). Gate counts and checklists are documented in `quality-gates.md`. The total check count (113) must stay consistent across SKILL.md, README.md, quick-reference.md, and quality-gates.md.

### Recursive S&T Pattern
Every phase is simultaneously the Tactic for its parent and the Strategy for its child. This is Goldratt's recursive decomposition. When writing phase descriptions, always make the dual role explicit: e.g., Strategy = "L1 Tactic (How do we achieve the vision?) → L2 Strategy (What research-backed approach?)".

### Anti-Patterns
Numbered sequentially from AP1 upward. Each has: Symptoms, Fix. When adding a new one, append to the end and do not renumber existing ones. Update INDEX.md's troubleshooting section.

## Editing Gotchas

- **SKILL.md's YAML frontmatter** uses the OpenCode skill format (`name:`, `description:`, `metadata:`, `license:`). Do not change the format without checking the OpenCode skill spec.
- **Command tables** appear in 3 files (SKILL.md, README.md, quick-reference.md). If you add a command, add it to all three.
- **Phase numbering** (0–8) is stable. Phase 0 is Constitution. Phases 1–3 are VDD additions. Phases 4–8 are the SDD chain. Do not renumber phases.
- **Gate check counts** in `quality-gates.md` Gate Summary Table must match the actual checklist items above it. The total (113) is the sum of all F/B/A columns across G1–G7.
- **Domain primers** are loaded dynamically by Phase 2 based on `vision.md` → Target Domains. When editing a primer, its two sections (Research Patterns, Impact Verification) are used by different subagents.
- **No build/toolchain** — this repo has no code, tests, linting, or CI. Don't add build configuration.

## Superset Relationship

VDD absorbs SDD. Every SDD command, feature, gate check, and anti-pattern must have an equivalent in VDD. When adding VDD-specific content, verify it doesn't accidentally break SDD backward-compatibility:
- `/vdd:specify "freeform description"` must work without a V/S/T chain.
- All SDD artifact paths (`constitution.md`, `specs/`, `plan.md`, `data-model.md`, `contracts/`, `tasks.md`) are preserved under `vdd/`.
- SDD's Boundaries section, MoSCoW labels, Clarify step, and Assumptions Surface prompt must all exist in VDD's Phase 4.
