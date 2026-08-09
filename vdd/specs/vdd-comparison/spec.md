# VDD vs Alternatives Comparison Page

> Impact Chain: V-001 → S-002 → T-003 → SP-004

Status: Draft
Version: 1.0
Last updated: 2026-08-10

## Tactical Origin
Implements: `vdd/tactics.md` → Action Item A-003 — Create comparison page: VDD vs SDD vs vibe coding vs TDD

## Overview

A single-page comparison document that positions VDD against the three most relevant alternative approaches: Spec-Driven Development (SDD), vibe coding, and Test-Driven Development (TDD). The page must be fair, evidence-backed, and actionable — helping developers pick the right approach for their context.

## User Stories

### Primary
As a developer evaluating methodologies, I want to see how VDD compares to alternatives I already know about, so that I can make an informed decision about which methodology to adopt.

## Acceptance Criteria

### AC-1: Four-way comparison [MUST]
Given the comparison page
When a developer reads it
Then it compares VDD against SDD, vibe coding, and TDD across at least 8 dimensions (not just a feature list)

### AC-2: Fair to alternatives [MUST]
Given each alternative methodology
When a developer reads its section
Then strengths are acknowledged alongside limitations — the comparison is balanced, not propaganda

### AC-3: Decision guide [MUST]
Given the comparison page
When a developer reaches the end
Then there is a "When to use what" section that recommends which methodology fits which context

### AC-4: Evidence-backed [SHOULD]
Given claims about methodologies
When a developer checks the sources
Then key claims are backed by citations or links to primary sources

### AC-5: Integrated into docs [SHOULD]
Given the VDD documentation structure
When a developer navigates
Then the comparison is linked from the README Documentation section

## Out of Scope
- Detailed feature-by-feature comparison (this is a strategic comparison, not a spec)
- Comparison with waterfall, Scrum, or other non-AI-native methodologies
- Live demo or interactive comparison (static content)

## Impact Verification
- Enables I-001 (adoption) by helping developers evaluate VDD against known alternatives
- Enables I-003 (reduced failure rates) by helping teams pick the right methodology

## Open Questions
- [RESOLVED] Which methodologies to compare? → Decision: SDD, vibe coding, TDD — the three most commonly compared alternatives in developer discussions.

## S&T Assumptions (Specs → Plan)

**Necessity:** A comparison page is necessary to position VDD in the methodology landscape and give evaluators a single reference point for decision-making.

**Achievability:** Achievable — it's a documentation page requiring research synthesis, not new technical capabilities.

**Sufficiency:** Sufficient — comparing VDD against the three most relevant alternatives covers the competitive landscape.

**Warnings:** The comparison must remain fair and evidence-backed to maintain credibility; biased comparisons backfire.
