# VDD Getting Started Tutorial

> Impact Chain: V-001 → S-002 → T-003 → SP-004

Status: Draft
Version: 1.0
Last updated: 2026-08-10

## Tactical Origin
Implements: `vdd/tactics.md` → Action Item A-001 — Build VDD Getting Started tutorial (walkthrough from vision→validate)

## Overview

A step-by-step tutorial that walks a developer from zero to a complete VDD-driven project. The tutorial must demonstrate the full 8-phase chain on a minimal but realistic project, proving that VDD works end-to-end. This is the "Hello World" of VDD — the first thing a new user experiences after installation.

## User Stories

### Primary
As a developer new to VDD, I want a guided tutorial that shows me exactly what to type and what to expect at each phase, so that I can understand the full VDD workflow within 30 minutes and feel confident applying it to my own projects.

### Secondary
As a tech lead evaluating VDD for my team, I want to see a complete end-to-end example with real outputs at each phase, so that I can assess whether VDD's methodology fits our workflow before committing to adoption.

## Boundaries

**Always do:**
- Show every command and its output transparently
- Use a real, minimal project (not a contrived toy)
- Include the actual generated artifacts (vision.md, strategy.md, etc.) in full
- Explain the WHY behind each phase, not just the WHAT

**Ask first (do not proceed unilaterally):**
- Choosing a project domain for the tutorial (should align with VDD's target domains)
- Publishing the tutorial as a separate repo vs. in-repo docs

**Never do:**
- Skip phases to "keep it short" — every phase must be demonstrated, even if some are abbreviated
- Fake or hand-edit outputs — the tutorial must show real AI-generated artifacts
- Use a project that requires paid services or API keys

## Acceptance Criteria

### AC-1: Tutorial structure completeness [MUST]
Given a developer has installed VDD and opened the tutorial
When they read through the tutorial from start to finish
Then the tutorial covers all 8 phases (Constitution through Validate) with at least one concrete example per phase

### AC-2: Copy-paste runnable [MUST]
Given the tutorial commands
When a developer copies and pastes each command in sequence
Then every command executes without errors and produces the expected output

### AC-3: 30-minute timebox [MUST]
Given a developer with basic familiarity with the terminal and AI coding tools
When they follow the tutorial sequentially without skipping steps
Then they complete the full walkthrough in under 30 minutes

### AC-4: Real outputs shown [MUST]
Given each phase in the tutorial
When a developer reaches the output section for that phase
Then the tutorial shows the actual generated file content (vision.md, strategy.md, etc.) in full or with representative excerpts for large files

### AC-5: Minimal realistic project [MUST]
Given the tutorial's example project
When a developer examines the project domain
Then the project is real-world enough to be useful (not "hello world" trivial) but small enough to complete in 30 minutes

### AC-6: Phase explanation [SHOULD]
Given each phase in the tutorial
When a developer reads the phase introduction
Then the tutorial explains WHY this phase exists and WHAT happens in it, not just WHAT commands to run

### AC-7: Troubleshooting section [SHOULD]
Given common issues developers might encounter
When they refer to the troubleshooting section
Then the tutorial covers installation problems, AI rate limits, gate failures, and how to recover

### AC-E1: Tutorial accessible without paid AI subscription [MUST]
Given a developer who has installed VDD
When they attempt to follow the tutorial
Then all commands work without requiring a paid AI subscription beyond what OpenCode provides by default

## Out of Scope
- Covering every variant of every command (tutorial shows the happy path + one error recovery example)
- Video recording of the tutorial (separate action item A-007)
- Non-English translations (separate action item A-010)
- Comparison with other methodologies (separate action item A-003)

## Non-Functional Requirements
- Accessibility: tutorial must be readable as plain Markdown on GitHub
- Maintainability: tutorial must reference the SKILL.md command table rather than re-documenting commands
- Performance: tutorial page must load fully in under 2 seconds on GitHub

## Impact Verification
- This spec enables Impact I-001 (developer adoption) by providing the critical first experience
- Tutorial completion rate will be tracked as a leading indicator
- Tutorial will be linked from README.md's Quick Start section
- Success metric: >50% of tutorial readers complete all 8 phases without abandoning

## Open Questions
- [RESOLVED] What should the tutorial's example project be? → Decision: Personal task tracker (todo app). Universally understood, small enough for 30 minutes, touches all 4 VDD target domains (webapp UI, data storage for tasks, ETL for analytics/export, infrastructure for deployment).
- [RESOLVED] Should the tutorial live in-repo or as a separate repo? → Decision: In-repo at `vdd/docs/tutorial.md`. Kept with the methodology, version-controlled alongside skill files, zero friction for readers.

## S&T Assumptions (Specs → Plan)

**Necessity:** A technical plan is necessary to define the tutorial's structure, format, example project selection, and how it integrates with the existing VDD documentation.

**Achievability:** This spec is achievable — writing a tutorial requires domain knowledge (VDD methodology) and clear writing, not complex infrastructure.

**Sufficiency:** The planned approach (single Markdown file with embedded examples) is sufficient to deliver a complete getting-started experience.

**Warnings:** The tutorial's example project must be carefully chosen — too complex and the 30-minute timebox fails; too trivial and it doesn't convince evaluators.
