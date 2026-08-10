# Vision

> Impact Chain: V-001

Status: Active
Version: 1.7
Last updated: 2026-08-10

## Vision Statement

Vision Driven Design (VDD) exists to transform how software gets built — from "what features should we ship?" to "what impact should we create?" Too many software projects fail not because the code was bad, but because nobody connected the code to a measurable real-world outcome. Teams ship features in a vacuum, stakeholders lose sight of why the project matters, and AI agents generate plausible code that doesn't advance any meaningful goal.

VDD changes this by making vision the root of all traceability. A human states the impact they want to create. AI agents handle the rest — researching the domain, auditing the codebase, generating specs grounded in real-world goals, planning, implementing, and validating — with bi-directional verification at every junction to ensure no requirement is missed and no scope is invented.

The vision for VDD itself is to make **quality output the top priority — verified through an extensive, integrated toolset spanning pre-deployment and post-deployment**. VDD must not just produce code; it must produce *verified* code, validated through every verification tool available: Playwright and Browserless for end-to-end browser testing and visual regression, Sentry for runtime error tracking and performance monitoring, the full CI/CD pipeline (lint, typecheck, unit test, integration test, accessibility audit, security scan, performance audit) pre-deployment, and production telemetry + alerting post-deployment.

VDD operates with a **"no stone unturned" mentality** — when it undertakes an assignment, it covers every inch. No surface is left unexamined. No edge case is dismissed as unlikely. No documentation page ships stale. No benchmark gap goes unresolved. No GitHub feature goes unused. No domain goes unprimed. No audit skips a file. This is not perfectionism — it is the mechanical consequence of bi-directional gates. Every parent goal demands its children collectively cover it (forward check). Every child artifact must trace to an authorized parent (backward check). Together, they make omission structurally impossible. VDD doesn't hope for completeness; it enforces it.

This mentality is operationalized through VDD's **internal review process** — a multi-layered, exhaustive quality regimen that covers every inch of every artifact. After every phase, a critic agent reviews the output against the phase's quality gate, checking every forward and backward trace, every S&T assumption, every count, every reference. After the full chain completes, `/vdd:validate` runs a comprehensive cross-artifact audit: drift detection on every AC, traceability on every commit, impact verification against every vision metric, and a substance audit rejecting cosmetic-only contributions. For this repo itself — the VDD skill — the review process extends to every public-facing file (README, AGENTS, INDEX, quick-reference, changelog, benchmarks) verified against every canonical source. VDD reviews itself with the same unsparing thoroughness it demands of its adopters.

VDD is designed for **universal access** — it must not be locked to any single tool or platform. Users should invoke VDD however they work: as agent slash commands (`/vdd:vision`) inside OpenCode or Claude Code, as MCP server tools (`vdd_init`, `vdd_vision`) callable from any MCP-compatible client, as a standalone CLI binary (`vdd init`, `vdd vision`) for terminal-native workflows, as a REST API for programmatic integration, or as IDE plugins (VS Code, JetBrains) for graphical interaction. Every access path calls the same canonical VDD engine — the methodology, the 8-phase chain, the 7 bi-directional gates, and the 113 checks are invariant regardless of how you reach them. The access layer is a shell; the VDD core is the kernel.

The ultimate expression of universal access is the **VDD public service** — the VDD MCP server deployed on Vercel at a public endpoint. Any developer, anywhere, with zero installation, zero API keys, and zero sign-up, connects their AI agent to VDD by pointing to `https://vdd.simonmak.com`. The MCP server is stateless, the VDD engine runs in Vercel serverless functions, and the output artifacts are written directly into the user's repository. No paywall, no registration wall, no platform lock-in — VDD is as free and frictionless as open source itself, because the methodology should spread by merit, not by barrier.

## Impact Model

### Goal

Make VDD the methodology that covers the complete development spectrum — from human behavior analysis at Vision to SurrealDB 3.x schema patterns at Tasks — deployed across 3+ AI agent platforms and reaching Top-10 trending on GitHub within 3 years.

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
| I-008 | VDD covers the full vertical spectrum — no concern is too abstract for Vision or too granular for Tasks | All actors | Domain primer coverage completeness; spec-to-task vertical gap audits |
| I-009 | Every VDD artifact produces tangible, demonstrable change — gates reject cosmetic-only contributions | All actors | Substance audit: % of artifacts with ≥1 MUST AC, % of strategy pillars with research citations, % of commits that change behavior (not comments) |
| I-010 | VDD is benchmarked as matching or exceeding every industry best practice (NASA SE, CMMI, DO-178C, IEC 62304, DORA, SDD) | Enterprise architects, tech leads | Benchmark compliance matrix; % of best-practice criteria that VDD matches/exceeds |
| I-011 | Every VDD project is verified through an extensive integrated toolset — Playwright/Browserless pre-deploy, Sentry post-deploy, full CI/CD quality pipeline | Developers, QA engineers | Tool coverage %; % of MUST ACs verified by automated tools; production error rate via Sentry |
| I-012 | GitHub artifacts (README.md, SKILL.md, AGENTS.md, CHANGELOG.md, CONTRIBUTING.md) accurately reflect the current repo state — no stale counts, no missing files, no mismatched domain primer listings | GitHub community, contributors, evaluators | README anti-pattern count matches actual; domain-primers listing matches directory; repository structure diagram matches disk; all generated docs are consistent with canonical sources |
| I-013 | VDD leverages every GitHub platform feature — Pages (docs site), Wiki (community knowledge), Discussions (Q&A/ideas), Projects (roadmap), Actions (CI/CD quality gates), full topic taxonomy, social preview, homepage linking to best content | GitHub community, discoverers, contributors | Pages deployed with documentation; Wiki populated with primers and FAQs; Discussions active with categories; Projects board tracking roadmap; Actions running quality-gate workflow on PRs |
| I-014 | VDD undertakes every assignment with a "cover every inch, leave no stone unturned" mentality — completeness is mechanically enforced by bi-directional gates, not left to human discipline | All actors, evaluators, auditors | Every file audited; every count verified; every gap resolved; every gate passed in both directions; every GitHub feature leveraged; every domain primed; every benchmark criterion met |
| I-015 | VDD has an exhaustive internal review process — critic agents per phase, full-chain cross-artifact audit via /vdd:validate, substance enforcement on every commit, and canonical-source verification for every public-facing file | VDD itself, contributors, evaluators | Every phase output gate-checked by critic agent; every commit substance-audited; every public-facing file audited against canonical sources; zero stale references across entire repo |
| I-016 | VDD is accessible through every developer interface — agent slash commands (`/vdd:*`), MCP server tools (`vdd_init`, `vdd_vision`, etc.), CLI binary (`vdd init`, `vdd vision`), REST API, and IDE plugins — so users invoke VDD however they work, never forced into a single tool | All actors, agent platforms, tooling ecosystems | MCP server published; CLI binary distributable via npm/pnpm; REST API documented; IDE extensions for VS Code/JetBrains; every access path calls the same canonical VDD engine |
| I-017 | VDD is freely available to the general public as a hosted service — the VDD MCP server is deployed on Vercel at a public endpoint, requiring no installation, no API key, no sign-up. Anyone can connect their AI agent to `https://vdd.simonmak.com` and start using VDD immediately, zero friction | General public, casual users, evaluators, non-developers | Public Vercel deployment active and reachable; MCP server responds to tool invocations without authentication; usage metrics tracked (opt-in); free tier guaranteed; rate limiting for abuse prevention |

## Stakeholder Map

| Role | Interest | Influence | Engagement Strategy |
|------|----------|-----------|-------------------|
| Developers (primary) | Faster, more meaningful work; AI that actually helps | High — they use it daily | Open source community, docs, tutorials, quick wins |
| Tech leads / CTOs (decision maker) | Reduced waste, predictable outcomes, auditable compliance | High — they approve adoption | Case studies, ROI data, comparison with SDD and ad-hoc approaches |
| Product managers | Features that demonstrably advance business goals | Medium — they write the visions | Templates, vision workshop guides, impact measurement frameworks |
| Open source community | Quality, coherence, contributor alignment | Medium — they spread it | GitHub stars, awesome lists, conference talks |
| GitHub community (organic discoverers) | Discover quality projects, signal trust through stars | High — they drive virality and trending | GitHub trending, topics, Discussions, showcase repos |
| AI coding agent platforms (OpenCode, Claude Code, Cursor, Copilot) | Compete on features; lack a standard methodology layer | Bundle VDD as the default methodology — auto-detect and activate | Every agent becomes a VDD distribution channel; users get impact-driven development out of the box |
| MCP server ecosystem (clients, hosts, tool builders) | MCP is the emerging standard for AI-tool interoperability but lacks a methodology tool | VDD exposed as MCP tools — any MCP client (Claude Desktop, OpenCode, Continue.dev) discovers and invokes VDD natively | MCP becomes VDD's universal integration layer; one server serves every MCP-compatible client |
| CLI/terminal-native developers | Prefer terminal over IDE agents; need scriptable, pipeable tools | `vdd` CLI — `vdd init`, `vdd vision "..."`, `vdd validate` as a standalone binary | npm/pnpm package; shell completions; works in any terminal, CI pipeline, or Docker container |
| Behavioral scientists / UX researchers | Research informs product but doesn't connect to implementation | Feed human behavior insights directly into Vision phase; VDD traces UX decisions → code → outcomes | Psychology research becomes a first-class engineering input |
| Database architects / backend engineers | Make schema decisions in isolation from product goals | VDD traces SurrealDB 3.x RELATE edges back to the vision impact they serve | No "cool tech for its own sake" — every schema choice justified by impact |
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
| Vertical spectrum coverage | 0 gaps — every phase has domain-specific patterns for all 4 target domains | Primers audit: human psychology ✅, SurrealDB ✅, etc. |
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
