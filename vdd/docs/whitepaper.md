# Vision Driven Design — Methodology Whitepaper

> Impact Chain: V-001 → S-002 → T-003 → A-011

**Draft for arXiv / methodology publication**

---

## Abstract

Vision Driven Design (VDD) is an AI-native software development methodology that extends
Spec-Driven Development (SDD) with bi-directional traceability from a human vision
statement to verified, impact-measured code. VDD introduces three upstream phases
(Vision, Strategy, Tactics) above the conventional spec chain, governed by Goldratt's
recursive Strategy-Tactic decomposition. At every junction between phases, bi-directional
verification gates validate both forward coverage (parent goals → child implementation)
and backward authorization (child artifacts → parent intent). The methodology is
implemented as an installable OpenCode skill and has been applied to webapp, data storage,
ETL, and infrastructure projects. This paper describes the VDD architecture, its 7
bi-directional gates with 113 total verification checks, its domain-primer system for
automated domain-specific research, and its full-auto execution mode that enables
fully autonomous AI-driven development from a single human vision statement.

## 1. Introduction

The rapid adoption of AI coding agents — with tools like GitHub Copilot, Cursor, and
Claude Code reaching 84% developer usage (Stack Overflow 2025) — has created a new
challenge: AI can generate code faster than humans can verify its alignment with
original intent. Spec-Driven Development (SDD) addresses this by making specifications
the source of truth, but SDD starts at the specification level. It does not connect
code to business goals, user impact, or measurable outcomes.

VDD addresses three gaps simultaneously:
1. **The upstream intent gap**: connecting code to why it exists
2. **The execution trust gap**: providing persistent context and bounded agent tasks
3. **The downstream value gap**: measuring whether releases changed user behavior

## 2. Related Work

### 2.1 Spec-Driven Development

GitHub's Spec Kit defines a Constitution → Spec → Plan → Tasks → Implement chain
with Markdown artifacts passed to AI agents as structured context. It has achieved
121K+ GitHub stars and 35 agent integrations...

### 2.2 Bi-directional Traceability in Systems Engineering

NASA's systems engineering processes, DO-178C for airborne software, and CMMI
Requirements Management all mandate bi-directional traceability — forward from
requirements to implementation, backward from implementation to requirements...

### 2.3 Strategy-Tactic Decomposition

Goldratt's Strategy-and-Tactic (S&T) tree defines a recursive pattern where every
level's Tactic becomes the next level's Strategy. Each S&T node validates four
assumptions: Necessity, Achievability, Sufficiency, and Warnings...

### 2.4 Impact Mapping

Gojko Adzic's Impact Mapping connects goals to actors, impacts, and deliverables —
the bridge between vision and implementation that VDD adopts...

## 3. VDD Architecture

### 3.1 The 8-Phase Chain

Vision → Strategy → Tactics → Specs → Plan → Tasks → Implement → Validate

Each arrow is a bi-directional gate with forward and backward verification.

### 3.2 The 7 Bi-Directional Gates

[Table of all 7 gates with 113 checks]

### 3.3 Domain Primers

Domain-specific research patterns loaded during Strategy phase...

### 3.4 Full-Auto Mode

Default execution mode: human provides Vision only. AI handles everything else...

## 4. Verification Design

### 4.1 Gate Structure

Each gate has: Forward checks (parent→children), Backward checks (children→parent),
and 4 S&T assumption validations.

### 4.2 Gate Self-Repair

When a gate fails, AI regenerates the failing section and re-checks (up to 3 attempts).

### 4.3 Impact Verification

Phase 8 validates not just spec compliance but vision impact alignment.

## 5. Implementation

VDD is implemented as an OpenCode skill — a collection of Markdown files with
embedded AI prompts, templates, and verification patterns. Distribution is via
GitHub; installation is a single `git clone` command.

## 6. Early Results

*To be populated with A-002 dogfood data and early adopter impact reports*

## 7. Conclusion

VDD demonstrates that bi-directional traceability — borrowed from aerospace and
defense systems engineering — can be productively applied to everyday software
development through AI-native automation. By making vision the root of all
traceability, VDD ensures that every line of code answers two questions: "What
vision goal do I serve?" and "Why am I necessary to achieve it?"

## References

*To be completed before publication*

*Target: arXiv cs.SE (Software Engineering)*
