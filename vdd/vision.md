# Vision

> Impact Chain: V-001

Status: Draft
Version: 1.0
Last updated: 2026-08-10

## Vision Statement

Vision Driven Design (VDD) exists to transform how software gets built — from "what features should we ship?" to "what impact should we create?" Too many software projects fail not because the code was bad, but because nobody connected the code to a measurable real-world outcome. Teams ship features in a vacuum, stakeholders lose sight of why the project matters, and AI agents generate plausible code that doesn't advance any meaningful goal.

VDD changes this by making vision the root of all traceability. A human states the impact they want to create. AI agents handle the rest — researching the domain, auditing the codebase, generating specs grounded in real-world goals, planning, implementing, and validating — with bi-directional verification at every junction to ensure no requirement is missed and no scope is invented.

The vision for VDD itself is to **maximize its impact on society** — to become the default methodology for any team building software that matters. By making it trivial for anyone to go from "I want to solve this problem" to deployed, impact-verified code, VDD can multiply the number of successful software projects, reduce the billions wasted on failed or misaligned software, and ultimately channel more of humanity's engineering effort toward work that demonstrably improves lives.

## Impact Model

### Goal

Make VDD the dominant methodology for impact-driven software development, reaching 10,000 active projects and measurably improving software project success rates within 3 years.

### Actors

| Actor | Current State | Desired State | Benefit |
|-------|--------------|---------------|---------|
| Solo developers | Build without specs, drift from intent, ship features that don't matter | Use VDD to autonomously go from vision→code with full traceability | Faster delivery, higher confidence, demonstrated impact |
| Product teams | Spend weeks on specs that don't connect to business goals; AI generates misaligned code | Provide a vision statement → AI drives the full pipeline with bidirectional verification | Reduced waste, aligned output, auditable traceability |
| Open source maintainers | Projects grow organically without measurable goals; contributors build in different directions | Anchor project around a vision.md; all contributions trace to impact goals | Coherent project direction, easier contributor onboarding |
| Enterprise architects | Compliance requires traceability but it's manual, expensive, and decays | VDD's automated bidirectional verification produces auditable traceability by default | Compliance evidence generated automatically, reduced audit cost |
| Underserved communities | Software isn't built for their needs because the ROI case doesn't close | Vision-first methodology lowers the barrier to building impact-driven software | More software that serves overlooked populations |

### Impacts

| Impact ID | Description | Actor | Measurement |
|-----------|-------------|-------|-------------|
| I-001 | Developers adopt VDD as their primary methodology | Solo developers + Product teams | GitHub stars, skill installations, `/vdd:init` usage |
| I-002 | Projects built with VDD demonstrate measurable real-world impact | All actors | Case studies, success metrics reported per vision.md |
| I-003 | Software project failure rate decreases among VDD adopters | Product teams + Enterprise architects | Before/after comparison of project outcomes |
| I-004 | AI-generated code becomes demonstrably more aligned with business goals | All actors | Drift report scores, traceability matrix completeness |
| I-005 | Underserved communities gain access to impact-driven software development | Underserved communities | Number of vision-first projects targeting these communities |

## Stakeholder Map

| Role | Interest | Influence | Engagement Strategy |
|------|----------|-----------|-------------------|
| Developers (primary) | Faster, more meaningful work; AI that actually helps | High — they use it daily | Open source community, docs, tutorials, quick wins |
| Tech leads / CTOs (decision maker) | Reduced waste, predictable outcomes, auditable compliance | High — they approve adoption | Case studies, ROI data, comparison with SDD and ad-hoc approaches |
| Product managers | Features that demonstrably advance business goals | Medium — they write the visions | Templates, vision workshop guides, impact measurement frameworks |
| Open source community | Quality, coherence, contributor alignment | Medium — they spread it | GitHub stars, awesome lists, conference talks |
| Underserved communities | Access to high-quality software built for their needs | Low but critical | Free tier, community partnerships, localized documentation |

## Success Metrics

### Lagging Indicators (measured months after broad adoption)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Active VDD projects | 10,000+ | `/vdd:init` telemetry (opt-in) + GitHub dependency graph |
| Project success rate improvement | 2x reduction in "failed to meet goals" | Survey of VDD adopters vs. industry baseline |
| Revenue/productivity impact attributed to VDD | $100M+ in aggregate | Case studies, user-reported value |
| Underserved community projects | 500+ active projects | Vision.md tags for community focus |

### Leading Indicators (measurable during growth phase)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| GitHub stars | 5,000+ | GitHub API |
| Skill installations | 2,000+ | Clone counts, package registry |
| Community contributors | 100+ | GitHub contributors |
| Case studies published | 20+ | vdd-showcase repo, blog posts |
| Conference talks / workshops | 10+ | Speaker tracking |
| Developer satisfaction (would recommend) | >80% | In-skill survey after `/vdd:validate` |

## Constraints & Boundaries

### Constraints (non-negotiable)

- VDD must remain open source (MIT) — no proprietary fork that locks out underserved communities
- VDD must remain a superset of SDD — backward compatibility is mandatory
- VDD must be platform-agnostic — work on OpenCode, Claude Code, Cursor, and manual prompt usage
- VDD must be self-documenting — the skill repo itself must be the canonical documentation
- VDD must respect user privacy — no mandatory telemetry, no data collection without opt-in

### Boundaries (explicitly out of vision scope)

- VDD is not a SaaS product — it's a methodology and an installable skill
- VDD is not a replacement for domain expertise — it's a framework that channels expertise into impact
- VDD is not a code generation tool — it's a process that governs code generation
- VDD is not targeting enterprise sales cycles in year 1 — grassroots adoption first

## Target Domains

- [x] WebApp
- [x] Data Storage
- [x] ETL
- [x] Infrastructure

## S&T Assumptions (Vision → Strategy)

*To be filled by AI during Gate G1 — how this Vision decomposes into Strategy.*
