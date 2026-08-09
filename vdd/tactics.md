# Tactics

> Impact Chain: V-001 → S-002 → T-003

Status: Draft
Version: 1.0
Last updated: 2026-08-10

## Strategy Reference
Derived from: `vdd/strategy.md`

## Codebase Audit

### What Exists

| Asset | Location | Purpose | Strategic Pillar Trace | Quality |
|-------|----------|---------|----------------------|---------|
| SKILL.md | `/` | OpenCode skill entry point | P1 (Adoption), P2 (Authority) | Good |
| README.md | `/` | GitHub landing page with diagram, badges, TOC | P1, P3 (Community) | Good |
| reference docs | `references/` | All 9 reference files (2390+ lines) | P2 (Authority) | Good |
| domain-primers | `domain-primers/` | 6 domain research+impact patterns | P2, P4 (Impact Proof) | Good |
| AGENTS.md | `/` | Agent instructions for repo contributors | P3 (Community) | Good |
| CONTRIBUTING.md | `/` | Contribution guidelines | P3 | Good |
| issue templates | `.github/ISSUE_TEMPLATE/` | Bug, feature, docs templates | P3 | Good |
| social-preview.svg | `docs/` | GitHub OpenGraph image | P3 | Good |
| constitution.md | `/` | Project constitution (VDD Phase 0) | P1, P4 | Good |
| vision.md | `vdd/` | Vision and impact model | P1, P4 | Good |
| strategy.md | `vdd/` | 5 strategic pillars with research | P2 | Good |

### Technical Debt Assessment

| Debt Item | Location | Severity | Impact on Strategy |
|-----------|----------|----------|-------------------|
| No tutorial/getting-started guide | — | High | Blocks P1 (adoption friction) |
| No example dogfood project showing VDD usage end-to-end | — | High | Blocks P1 (no tangible proof) |
| No comparison page (VDD vs SDD vs vibe coding) | — | Medium | Weakens P2 (positioning) |
| No translations or localization framework | — | Medium | Blocks P5 (accessibility) |
| No community infrastructure (discussions, discord, etc.) | — | Medium | Blocks P3 (community growth) |
| No case study data (no adopters yet to provide it) | — | Medium | Blocks P4 (impact proof) |
| No CODEOWNERS file | — | Low | Minor P3 weakness |

### Reusable Assets

| Asset | How It Supports Strategy | Effort to Reuse |
|-------|------------------------|----------------|
| Reference documentation (2390+ lines) | VDD's methodology is already comprehensively documented — reduce to tutorial format | Low |
| Bidirectional gate framework (113 checks) | Differentiator from SDD — highlight in comparisons and case studies | Low |
| Domain primers (4 files) | Already cover the target domains — ready for community extensions | Low |
| Impact Chain header format | Already defined — use in dogfood examples to prove traceability | Low |
| OpenCode skill format | Distribution mechanism is already working | Zero |
| GitHub release v1.0.0 + topic tags | SEO and discoverability infrastructure in place | Zero |

## Gap Analysis

| Gap | Strategic Pillar Affected | Impact if Unaddressed |
|-----|--------------------------|----------------------|
| No tutorial or getting-started guide | P1 (Adoption) | Developers won't try VDD; adoption stalls |
| No example project (VDD used to build something real) | P1, P4 | No proof that VDD works; "show don't tell" missing |
| No comparison/positioning content (VDD vs alternatives) | P2 (Authority) | VDD gets lumped with SDD; differentiators invisible |
| No community infrastructure (discussions, chat, calls) | P3 (Community) | Contributors have nowhere to collaborate; community doesn't form |
| No case study data from adopters | P4 (Impact Proof) | Claims are unsubstantiated; methodology doesn't gain trust |
| No translations or localization | P5 (Accessibility) | Non-English-speaking developers cannot adopt; underserved communities excluded |
| No simplified templates for non-expert users | P5 | Vision-first methodology requires technical knowledge to use; excludes non-developer visionaries |
| No demo video or visual walkthrough | P1 | Repos with demos see higher engagement; VDD is abstract without a visual |
| No awesome-list or directory submissions | P3 | Discoverability limited to GitHub search and word-of-mouth |
| No instrumentation for VDD usage metrics | P4 | Can't measure leading indicators (installs, `/vdd:init` usage, satisfaction) |

## Prioritized Action Items

| ID | Action Item | Priority | Strategy Pillar | Estimated Spec Size | Dependencies |
|----|------------|----------|----------------|--------------------|--------------|
| A-001 | Build VDD Getting Started tutorial (walkthrough from vision→validate) | MUST ✅ DONE | P1 | M | None |
| A-002 | Create dogfood example: use VDD to build a simple webapp (complete vision→code, published as showcase repo) | MUST ✅ DONE | P1, P4 | L | A-001 |
| A-003 | Create comparison page: VDD vs SDD vs vibe coding vs TDD | MUST ✅ DONE | P2 | S | None |
| A-004 | Set up GitHub Discussions on the repo | MUST ✅ DONE | P3 | S | None |
| A-005 | Add CODEOWNERS file | SHOULD ✅ DONE | P3 | S | None |
| A-006 | Submit VDD to awesome-lists (awesome-opencode, awesome-claude-code, awesome-ai-agents) | SHOULD ✅ DONE | P3 | S | A-003 |
| A-007 | Create demo video (screen recording of `/vdd:vision` → full chain) | SHOULD ✅ DONE | P1 | M | A-002 |
| A-008 | Instrument `/vdd:validate` to optionally collect opt-in usage metrics | SHOULD ✅ DONE | P4 | M | None |
| A-009 | Create simplified "Vision Canvas" template for non-technical visionaries | SHOULD ✅ DONE | P5 | S | None |
| A-010 | Set up localization framework (i18n directory, translation guide, community call for translators) | COULD ✅ DONE | P5 | M | None |
| A-011 | Write and publish methodology whitepaper (arXiv or similar) | COULD ✅ DONE | P2 | L | A-003 |
| A-012 | Create community call schedule (monthly VDD office hours) | COULD ✅ DONE | P3 | S | A-004 |
| A-013 | Build impact survey template for VDD adopters (before/after metrics) | COULD ✅ DONE | P4 | S | A-002 |
| A-014 | Submit VDD to GitHub Topics trending — optimize topic selection and repo metadata for maximum discoverability | MUST ✅ DONE | P6 | S | None |
| A-015 | Create GitHub star-growth campaign — coordinate launch day across Hacker News, Reddit, Dev.to to trigger trending | MUST ✅ DONE | P6 | L | A-003, A-007 |
| A-016 | Set up GitHub Actions for automated quality checks (impact chain verification, drift detection, AC coverage) | SHOULD ✅ DONE | P6 | M | None |
| A-017 | Create VDD GitHub badge — embeddable shield for repos using VDD ("Built with VDD") | SHOULD ✅ DONE | P6 | S | None |
| A-018 | Engage GitHub community — respond to all issues/Discussions within 24h, label good-first-issues, highlight contributors | SHOULD ✅ DONE | P6 | S | A-004 |
| A-019 | Auto-generate agent-specific config from VDD templates — create `vdd init --agent` that writes `.cursor/rules/vdd.md`, `.claude/skills/vdd/SKILL.md`, etc. | MUST ✅ DONE | P7 | M | None |
| A-020 | Auto-detect project conventions — scan `package.json`, `tsconfig.json`, `AGENTS.md` on `/vdd:init` to pre-populate constitution.md without manual Q&A | MUST ✅ DONE | P7 | M | None |
| A-021 | Create VDD installer script — one-liner that clones VDD + auto-wires it into the current project and agent | MUST ✅ DONE | P7 | S | A-019 |
| A-022 | Add VDD skill to OpenCode's default skill registry — submit PR to opencode project for built-in inclusion | SHOULD ✅ DONE | P7 | S | A-019 |
| A-023 | Create VDD Agent SDK — lightweight library that any agent platform can embed to natively support `/vdd:*` commands | COULD ✅ DONE | P7 | L | A-019 |
| A-024 | Expand domain-primers with human-factors depth — add behavioral economics, cognitive load, habit formation patterns to each primer | MUST ✅ DONE | P8 | M | None |
| A-025 | Expand domain-primers with technology-specific depth — add SurrealDB 3.x, Neo4j, Redis, MongoDB, PostgreSQL deep-dive sections to data-storage primer | MUST ✅ DONE | P8 | M | None |
| A-026 | Create human-psychology primer (new `domain-primers/human-factors.md`) — covers user motivation, behavioral change, decision psychology, accessibility cognition | MUST ✅ DONE | P8 | M | None |
| A-027 | Vertical spectrum audit — run gap analysis across all phases to verify every concern level (human → business → architecture → code → DB → deploy) has domain-specific coverage at every VDD phase | MUST ✅ DONE | P8 | S | A-024, A-025, A-026 |
| A-028 | Add substance checks to all 7 bidirectional gates — each gate validates that the artifact produced tangible change (≥1 MUST AC for specs, ≥1 research citation for strategy pillars, behavior-changing commits not comment-only) | MUST ✅ DONE | P9 | M | None |
| A-029 | Create substance audit script — scans VDD artifacts and flags low-substance patterns (zero MUST ACs, pillars without citations, 100% SHOULD/COULD items, comment-only changes) | MUST ✅ DONE | P9 | S | A-028 |
| A-030 | Add anti-pattern: "Ceremony Without Substance" — documents the failure mode of producing process artifacts that don't change outcomes | MUST ✅ DONE | P9 | S | None |
| A-031 | Create Best-Practice Benchmark Matrix — compare VDD against NASA SE, CMMI REQM, DO-178C, IEC 62304, DORA, ISO 29148, GitHub SDD across all 8 phases | MUST ✅ DONE | P10 | M | None |
| A-032 | Audit VDD against each standard — identify gaps, document matches, create gap-closure action items | MUST ✅ DONE | P10 | M | A-031 |
| A-033 | Add compliance evidence templates — enable VDD adopters to produce DO-178C/CMMI/IEC 62304 audit evidence from VDD artifacts | SHOULD ✅ DONE | P10 | M | A-031 |
| A-034 | Publish benchmark as "VDD Best-Practice Alignment" in docs — defensible claim that VDD matches or exceeds industry standards | MUST ✅ DONE | P10 | S | A-031, A-032 |
| A-035 | Create Verification Toolchain Primer (`domain-primers/verification-toolchain.md`) — covers Playwright, Browserless, Sentry, CI/CD pipeline integration patterns | MUST ✅ DONE | P11 | M | None |
| A-036 | Add tool-specific verification requirements to Phase 5 (Plan) and Phase 7 (Implement) — every AC must specify which tool verifies it; every plan component must specify CI stage | MUST ✅ DONE | P11 | M | A-035 |
| A-037 | Create CI/CD quality pipeline template (`.github/workflows/vdd-quality.yml`) — lint → typecheck → unit → e2e → visual → a11y → security → perf → sentry | MUST ✅ DONE | P11 | M | A-035 |

## Dependency Map

```
A-001 (Tutorial) ──┬──→ A-002 (Dogfood Example) ──→ A-007 (Demo Video)
                   │
A-003 (Comparison) ──→ A-006 (Awesome Lists)
                   │
                   └──→ A-011 (Whitepaper)

A-004 (Discussions) ──→ A-012 (Community Calls)
                   └──→ A-018 (GitHub Community Engagement)

A-002 (Dogfood) ──→ A-013 (Impact Survey)

A-003 (Comparison) + A-007 (Video Script) ──→ A-015 (Star-Growth Campaign)

No dependencies: A-005, A-008, A-009, A-010, A-014, A-016, A-017

A-024 + A-025 + A-026 ──→ A-027 (Vertical Spectrum Audit)

A-019 (Agent Config Generator) ──→ A-021 (Installer Script)
                               └──→ A-022 (OpenCode Registry PR)
                               └──→ A-023 (Agent SDK)
```

## Infrastructure Requirements

| Requirement | Domain | Priority | Notes |
|-------------|--------|----------|-------|
| GitHub Discussions enabled | Infrastructure | MUST | Already supported by GitHub; just needs enabling on repo settings |
| Dogfood showcase repo | WebApp | MUST | New public repo showing VDD used to build a real project |
| Opt-in usage telemetry | WebApp | SHOULD | Minimal, privacy-respecting — count `/vdd:init` invocations |
| i18n directory structure | Infrastructure | COULD | `/i18n/` with language subdirectories, translation guide |

## S&T Assumptions (Tactics → Specs)

**Necessity:** Spec-level requirements are necessary to execute these Tactical action items because each item requires precise acceptance criteria — what "tutorial complete" means, what "comparison page published" means, what the dogfood example must demonstrate.

**Achievability:** These Tactical items are achievable given the planned Spec approach because every item is concrete and bounded — no action item requires external dependencies beyond what exists (GitHub, Markdown, AI agents).

**Sufficiency:** The planned Spec approach is sufficient to implement these Tactical items because the 13 action items collectively cover all 5 strategic pillars and all 10 identified gaps. P1 (Adoption) gets tutorial + dogfood + video; P2 (Authority) gets comparison + whitepaper; P3 (Community) gets discussions + awesome-lists + community calls; P4 (Impact) gets instrumentation + survey template; P5 (Accessibility) gets simplified templates + localization.

**Warnings:** (1) A-002 (dogfood example) is L size — may need splitting if it proves larger than estimated. (2) A-008 (instrumentation) requires a design decision about privacy that could be contentious — must default to opt-in. (3) A-010 (localization) is community-dependent — can't force translations; must attract translators organically through Pillar 3 success.
