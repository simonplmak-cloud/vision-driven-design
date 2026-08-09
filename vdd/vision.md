# Vision

> Impact Chain: V-001

Status: Draft
Version: 1.0
Last updated: 2026-08-10

## Vision Statement

Vision Driven Design (VDD) exists to transform how software gets built — from "what features should we ship?" to "what impact should we create?" Too many software projects fail not because the code was bad, but because nobody connected the code to a measurable real-world outcome. Teams ship features in a vacuum, stakeholders lose sight of why the project matters, and AI agents generate plausible code that doesn't advance any meaningful goal.

VDD changes this by making vision the root of all traceability. A human states the impact they want to create. AI agents handle the rest — researching the domain, auditing the codebase, generating specs grounded in real-world goals, planning, implementing, and validating — with bi-directional verification at every junction to ensure no requirement is missed and no scope is invented.

The vision for VDD itself is to **maximize its impact on society by promoting VDD on GitHub and integrating it automatically into coding agents' existing tools** — to make VDD the invisible methodology that every AI coding agent already knows how to use, without the developer needing to install or configure anything. VDD should auto-detect existing project conventions (package.json, tsconfig, AGENTS.md), auto-generate constitution.md, and auto-wire itself into the agent's context — whether that agent is OpenCode, Claude Code, Cursor, Copilot, or any future AI coding tool. The developer should simply write `/vdd:vision` and the rest happens transparently. By making VDD zero-friction at the agent level, spreading through GitHub-native channels, and embedding into the tools developers already use, VDD can multiply the number of successful software projects, reduce the billions wasted on failed or misaligned software, and ultimately channel more of humanity's engineering effort toward work that demonstrably improves lives.

## Impact Model

### Goal

Make VDD the default methodology auto-integrated into every major AI coding agent, reaching 10,000+ projects using VDD (with zero manual installation) and appearing as a Top-10 trending methodology on GitHub within 3 years.

### Actors

| Actor | Current State | Desired State | Benefit |
|-------|--------------|---------------|---------|
| Solo developers | Build without specs, drift from intent, ship features that don't matter | Use VDD to autonomously go from vision→code with full traceability | Faster delivery, higher confidence, demonstrated impact |
| Product teams | Spend weeks on specs that don't connect to business goals; AI generates misaligned code | Provide a vision statement → AI drives the full pipeline with bidirectional verification | Reduced waste, aligned output, auditable traceability |
| Open source maintainers | Projects grow organically without measurable goals; contributors build in different directions | Anchor project around a vision.md; all contributions trace to impact goals | Coherent project direction, easier contributor onboarding |
| Enterprise architects | Compliance requires traceability but it's manual, expensive, and decays | VDD's automated bidirectional verification produces auditable traceability by default | Compliance evidence generated automatically, reduced audit cost |
| GitHub community (stars, forks, contributors) | Discover open source projects through GitHub search and trending; find VDD unclear without social proof | VDD appears in GitHub trending, has 10K+ stars, active Discussions, and a showcase of dogfood projects | Trust through social proof; easy discoverability via topics and search |
| Underserved communities | Software isn't built for their needs because the ROI case doesn't close | Vision-first methodology lowers the barrier to building impact-driven software | More software that serves overlooked populations |

### Impacts

| Impact ID | Description | Actor | Measurement |
|-----------|-------------|-------|-------------|
| I-001 | Developers adopt VDD as their primary methodology | Solo developers + Product teams | GitHub stars, skill installations, `/vdd:init` usage |
| I-002 | Projects built with VDD demonstrate measurable real-world impact | All actors | Case studies, success metrics reported per vision.md |
| I-003 | Software project failure rate decreases among VDD adopters | Product teams + Enterprise architects | Before/after comparison of project outcomes |
| I-004 | AI-generated code becomes demonstrably more aligned with business goals | All actors | Drift report scores, traceability matrix completeness |
| I-005 | Underserved communities gain access to impact-driven software development | Underserved communities | Number of vision-first projects targeting these communities |
| I-006 | GitHub community discovers and adopts VDD organically through trending and search | GitHub community | GitHub stars, forks, clones, Discussions activity, topic-rank position |
| I-007 | Coding agents auto-detect and integrate VDD into any project with zero manual setup | AI coding agent users | Number of agents supporting VDD natively; `/vdd:init` auto-triggered by agent |

## Stakeholder Map

| Role | Interest | Influence | Engagement Strategy |
|------|----------|-----------|-------------------|
| Developers (primary) | Faster, more meaningful work; AI that actually helps | High — they use it daily | Open source community, docs, tutorials, quick wins |
| Tech leads / CTOs (decision maker) | Reduced waste, predictable outcomes, auditable compliance | High — they approve adoption | Case studies, ROI data, comparison with SDD and ad-hoc approaches |
| Product managers | Features that demonstrably advance business goals | Medium — they write the visions | Templates, vision workshop guides, impact measurement frameworks |
| Open source community | Quality, coherence, contributor alignment | Medium — they spread it | GitHub stars, awesome lists, conference talks |
| GitHub community (organic discoverers) | Discover quality projects, signal trust through stars | High — they drive virality and trending | GitHub trending, topics, Discussions, showcase repos |
| AI coding agent platforms (OpenCode, Claude Code, Cursor, Copilot) | Compete on features; lack a standard methodology layer | Bundle VDD as the default methodology — auto-detect and activate | Every agent becomes a VDD distribution channel; users get impact-driven development out of the box |
| Underserved communities | Access to high-quality software built for their needs | Low but critical | Free tier, community partnerships, localized documentation |

## Success Metrics

### Lagging Indicators (measured months after broad adoption)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Active VDD projects | 10,000+ | `/vdd:init` telemetry (opt-in) + GitHub dependency graph |
| GitHub stars | 10,000+ | GitHub API |
| GitHub trending appearances | Monthly | GitHub trending archives for methodology/skill topics |
| Project success rate improvement | 2x reduction in "failed to meet goals" | Survey of VDD adopters vs. industry baseline |
| Revenue/productivity impact attributed to VDD | $100M+ in aggregate | Case studies, user-reported value |
| Underserved community projects | 500+ active projects | Vision.md tags for community focus |

### Leading Indicators (measurable during growth phase)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| GitHub stars | 5,000+ | GitHub API |
| GitHub trending appearances | Weekly during launch month | GitHub trending page |
| GitHub Discussions activity | 50+ weekly participants | Discussions API |
| AI agents natively integrating VDD | 3+ (OpenCode, Claude Code, Cursor/Copilot via rules/skills) | Agent feature announcements, documentation |
| Skill installations (clones) | 2,000+ | GitHub clone traffic |
| Community contributors | 100+ | GitHub contributors |
| Dogfood repos using VDD | 20+ showcase repos | GitHub topic: `vision-driven-design` |
| Developer satisfaction (would recommend) | >80% | In-skill survey after `/vdd:validate` |
| Conference talks / workshops | 10+ | Speaker tracking |

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
