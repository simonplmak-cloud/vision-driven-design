# Technical Plan: VDD Getting Started Tutorial

> Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005

## Spec Reference
Implements: `vdd/specs/vdd-tutorial/spec.md`

## Architecture Overview

Single Markdown file (`vdd/docs/tutorial.md`) providing a linear walkthrough of the VDD 8-phase chain using a personal task tracker as the example project. The tutorial is self-contained — all commands are runnable, all outputs are real AI-generated artifacts. Links to VDD's reference documentation for deep dives; does not duplicate reference content.

## Component Breakdown

### Tutorial File
- **Responsibility:** Present the complete walkthrough
- **Location:** `vdd/docs/tutorial.md`
- **Accepts:** (none — static content)
- **Returns:** (none — documentation artifact)
- **AC Coverage:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-E1

### README Quick Start Link
- **Responsibility:** Point new users to the tutorial
- **Location:** `README.md` → Quick Start section
- **Accepts:** (edit)
- **Returns:** (edit)
- **AC Coverage:** AC-3 (discoverability)

## Technology Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Format | Markdown (.md) | Native GitHub rendering, no build step, compatible with all platforms |
| Location | `vdd/docs/tutorial.md` | In-repo, version-controlled alongside methodology |
| Example project | Personal task tracker (todo app) | Minimal domain, universally understood, touches all 4 VDD domains |
| Phase coverage | All 8 phases demonstrated | Required by spec AC-1; even abbreviated phases must appear |

## Integration Points
- README.md — add link to tutorial in Quick Start section
- SKILL.md — no change needed (command reference already covers all phases)
- constitution.md — no change needed

## AC Coverage Map

| AC | Component(s) | Contract(s) |
|----|-------------|-------------|
| AC-1 | Tutorial File | N/A (static content) |
| AC-2 | Tutorial File | N/A |
| AC-3 | Tutorial File, README Quick Start Link | N/A |
| AC-4 | Tutorial File | N/A |
| AC-5 | Tutorial File | N/A |
| AC-6 | Tutorial File | N/A |
| AC-7 | Tutorial File | N/A |
| AC-E1 | Tutorial File | N/A |

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Tutorial commands go stale as VDD evolves | Medium | Medium | Use phase command names from SKILL.md (stable), not raw AI prompts; add "Last verified: [date]" footer |
| 30-minute timebox is too optimistic | Medium | Low | Design for 30 min; if exceeded, split into "Quick Tour" (15 min highlights) + "Full Tutorial" |
| Tutorial example too complex for newcomers | Low | Medium | Task tracker is universally understood; if feedback indicates otherwise, switch to even simpler domain |

## S&T Assumptions (Plan → Tasks)

**Necessity:** Task breakdown is necessary to sequence tutorial writing, review, and README integration.

**Achievability:** This plan is achievable — it's a single Markdown file with no external dependencies.

**Sufficiency:** The planned tasks are sufficient to deliver a complete, runnable tutorial.

**Warnings:** The tutorial should be verified by running the actual commands in a fresh environment before publishing.
