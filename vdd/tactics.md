# Tactics

> Impact Chain: V-001 → S-002 → T-003

Status: Active
Version: 2.0
Last updated: 2026-08-10

## Strategy Reference
Derived from: `vdd/strategy.md`

## Codebase Audit

### What Exists

| Asset | Location | Purpose | Strategic Pillar Trace | Quality |
|-------|----------|---------|----------------------|---------|
| SKILL.md | `/` | OpenCode skill entry point | P1 (Adoption), P2 (Authority) | Good |
| README.md | `/` | GitHub landing page with diagram, badges, TOC | P1, P3 (Community) | Good |
| reference docs | `references/` | 10 reference files | P2 (Authority), P10 (Benchmark) | Good |
| domain-primers | `domain-primers/` | 7 domain research+impact patterns | P2, P4 (Impact Proof), P8 (Spectrum) | Good |
| AGENTS.md | `/` | Agent instructions for repo contributors | P3 (Community) | Good |
| CONTRIBUTING.md | `/` | Contribution guidelines | P3 | Good |
| issue templates | `.github/ISSUE_TEMPLATE/` | Bug, feature, docs templates | P3 | Good |
| social-preview.svg | `docs/` | GitHub OpenGraph image | P3 | Good |
| constitution.md | `/` | Project constitution (VDD Phase 0) | P1, P4 | Good |
| vision.md | `vdd/` | Vision and impact model | P1, P4 | Good |
| strategy.md | `vdd/` | 12 strategic pillars with research, competitive analysis, risk register | P2 | Good |

### Technical Debt Assessment

| Debt Item | Status | Resolution |
|-----------|--------|------------|
| No tutorial/getting-started guide | ✅ Resolved | `vdd/docs/tutorial.md` |
| No example dogfood project | ✅ Resolved | `github.com/simonplmak-cloud/vdd-dogfood-task-tracker` |
| No comparison page | ✅ Resolved | `vdd/docs/comparison.md` |
| No translations or localization framework | ✅ Resolved | `vdd/docs/localization.md` |
| No community infrastructure | ✅ Resolved | GitHub Discussions, Wiki, Pages enabled |
| No case study data | ⏳ Lagging | Awaiting adopter metrics (I-003) |
| No CODEOWNERS file | ✅ Resolved | `.github/CODEOWNERS` |
| No safety-critical domain primer | ✅ Resolved | `domain-primers/safety-critical.md` |
| No compliance evidence templates | ✅ Resolved | `references/compliance-evidence.md` |
| No universal access layer (MCP/CLI) | 🔲 Not started | A-038 — VDD universal access (MCP server, CLI, Vercel deployment) |

### Reusable Assets

| Asset | How It Supports Strategy | Effort to Reuse |
|-------|------------------------|----------------|
| Reference documentation | VDD's methodology is comprehensively documented (52 .md files) — ready for tutorial, API, MCP embedding | Low |
| Bidirectional gate framework (113 checks) | Differentiator from SDD — verified at every gate; all 113 checks pass | Low |
| Domain primers (7 files) | Cover target domains + human-factors + verification-toolchain + safety-critical | Low |
| Impact Chain header format | Already defined — used in every artifact to prove traceability | Low |
| OpenCode skill format | Distribution mechanism already working | Zero |
| GitHub release + tags + topics | SEO and discoverability infrastructure in place | Zero |
| Compliance evidence templates | DO-178C, IEC 62304, CMMI, ISO 29148 evidence maps ready | Low |
| Benchmark matrix | 47/47 criteria, 11 exceeded, 0 gaps — ready for publication | Zero |

## Gap Analysis

| Gap | Status |
|-----|--------|
| No tutorial or getting-started guide | ✅ A-001 (tutorial.md) |
| No example project (VDD used to build something real) | ✅ A-002 (dogfood repo) |
| No comparison/positioning content | ✅ A-003 (comparison.md) |
| No community infrastructure | ✅ A-004, A-018 (Discussions, Wiki, Pages) |
| No case study data from adopters | ⏳ Lagging I-003 (requires real adopters) |
| No translations or localization | ✅ A-010 (localization.md) |
| No simplified templates for non-expert users | ✅ A-009 (vision-canvas.md) |
| No demo video | ✅ A-007 (demo-video-script.md) |
| No awesome-list submissions | ✅ A-006 (awesome-lists.md) |
| No usage metrics instrumentation | ✅ A-008 (telemetry.md) |
| No safety-critical domain coverage | ✅ A-026 (safety-critical.md) |
| No compliance evidence templates | ✅ A-033 (compliance-evidence.md) |
| No universal access layer (MCP/CLI/public service) | 🔲 A-038 (vdd-universal-access spec) |
| No CI/CD quality pipeline template | ✅ A-037 (vdd-quality.yml workflow) |

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
| A-038 | Build VDD universal access layer — MCP server (14 tools), CLI binary (`vdd`), shared engine module, npm-publishable package | MUST ✅ DONE (delivered in simonplmak-cloud/vision-driven-design) | P12 (Universal Access), P7 (Agent Integration) | L | A-019, A-023 |

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
                                └──→ A-038 (Universal Access — MCP + CLI + Vercel)
```

## Infrastructure Requirements

| Requirement | Domain | Priority | Notes |
|-------------|--------|----------|-------|
| GitHub Discussions enabled | Infrastructure | MUST ✅ DONE | Enabled on repo |
| Dogfood showcase repo | WebApp | MUST ✅ DONE | github.com/simonplmak-cloud/vdd-dogfood-task-tracker |
| Opt-in usage telemetry | WebApp | SHOULD ✅ DONE | vdd/docs/telemetry.md |
| i18n directory structure | Infrastructure | COULD ✅ DONE | vdd/docs/localization.md |
| GitHub Pages + Wiki | Infrastructure | MUST ✅ DONE | Pages: simonplmak-cloud.github.io/vision-driven-design; Wiki: navigation hub |
| Vercel deployment for public MCP service | Infrastructure | MUST | A-038 — MCP server at vdd.simonmak.com |

## S&T Assumptions (Tactics → Specs)

**Necessity:** Spec-level requirements are necessary to execute these Tactical action items because each item requires precise acceptance criteria — what "MCP server published" means, what "CLI binary shippable" means, what "Vercel deployment complete" means.

**Achievability:** These Tactical items are achievable given the planned Spec approach because every item is concrete and bounded — no action item requires external dependencies beyond what exists (GitHub, npm, Vercel, Node.js).

**Sufficiency:** The planned Spec approach is sufficient to implement these Tactical items because the 38 action items collectively cover all 12 strategic pillars and all 14 identified gaps. P1 (Adoption) gets tutorial + dogfood + video; P2 (Authority) gets comparison + whitepaper; P3 (Community) gets discussions + wiki + pages; P4 (Impact) gets instrumentation + survey; P5 (Accessibility) gets canvas + localization; P6 (GitHub) gets topics + campaign + badge; P7 (Agents) gets config generator + SDK + universal access (A-038); P8 (Spectrum) gets all 7 primers; P9 (Substance) gets gate checks + audit script; P10 (Benchmark) gets matrix + compliance evidence; P11 (Toolchain) gets CI/CD pipeline + verification primer; P12 (Universal Access) gets MCP + CLI + Vercel deployment.

**Warnings:** (1) A-038 (universal access) is the only open item — requires TypeScript/Node.js development, npm publishing, and Vercel deployment. (2) Case study data (I-003) remains lagging — requires real adopter metrics which can't be forced. (3) Vercel free tier has limits; public service may need monitoring for cost overruns.
