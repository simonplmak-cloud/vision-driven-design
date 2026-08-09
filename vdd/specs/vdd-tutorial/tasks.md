# Task List: VDD Getting Started Tutorial

> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006

## Plan Reference
Implements: `vdd/specs/vdd-tutorial/plan.md`

## Tasks

### Setup

- [ ] **TASK-001** [S] Create directory and scaffold tutorial file
  - Creates: `vdd/docs/tutorial.md` with placeholder sections
  - Depends on: none

### Content

- [ ] **TASK-002** [M] [P] Write Phase 0-2 sections (Constitution, Vision, Strategy)
  - Covers: phases 0 through 2 of the VDD chain
  - Example project: personal task tracker
  - Includes: commands, expected outputs, phase explanations
  - Depends on: TASK-001

- [ ] **TASK-003** [M] Write Phase 3-5 sections (Tactics, Specs, Plan)
  - Covers: phases 3 through 5 of the VDD chain
  - Includes: repo audit example, spec generation, plan output
  - Depends on: TASK-001

- [ ] **TASK-004** [M] Write Phase 6-8 sections (Tasks, Implement, Validate)
  - Covers: phases 6 through 8 of the VDD chain
  - Includes: task breakdown, implementation, validation output
  - Depends on: TASK-003

- [ ] **TASK-005** [S] Write Introduction and Troubleshooting sections
  - Covers: "What is VDD" intro, prerequisites, troubleshooting common issues
  - Depends on: TASK-001

### Integration

- [ ] **TASK-006** [S] Add tutorial link to README.md Quick Start
  - Adds: link to `vdd/docs/tutorial.md` in README Quick Start section
  - Depends on: TASK-005

### Verification

- [ ] **TASK-007** [M] Walk through tutorial as a new user
  - Tests: AC-1 (8 phases covered), AC-2 (commands runnable), AC-3 (30-minute timebox), AC-4 (outputs shown), AC-5 (realistic project), AC-E1 (no paid AI needed)
  - Verifies every command in the tutorial executes correctly
  - Depends on: TASK-002, TASK-003, TASK-004, TASK-005

## Legend
- `[S]` Small — under 1 hour
- `[M]` Medium — 1–3 hours
- `[L]` Large — 3–6 hours (consider splitting)
- `[P]` Parallelizable — can run concurrently with other `[P]` tasks at same level
