# Tactics

> Impact Chain: V-001 → S-002 → T-003

Status: Complete
Version: 1.5.5
Last updated: 2026-08-12

## Strategy Reference
Derived from: `vdd/strategy.md`

## Codebase Audit

### What Exists

| Asset | Location | Purpose | Strategic Pillar Trace | Quality |
|-------|----------|---------|----------------------|---------|
| SKILL.md | root | OpenCode entry point with full skill definition | P1 (Skill Architecture) | Good |
| README.md | root | GitHub landing page with methodology overview | P13 (SEO & Awareness) | Good |
| constitution.md | root | Project constitution (dogfooded) | P1 (Skill Architecture) | Good |
| AGENTS.md | root | Agent instructions for the skill repository | P1 (Skill Architecture) | Good |
| index.html | root | GitHub Pages landing page | P13 (SEO & Awareness) | Good |
| references/ | references/ | 11 authoritative reference docs | P1 (Skill Architecture) | Good |
| domain-primers/ | domain-primers/ | 7 domain research primers | P2 (Domain Primers) | Good |
| vdd/docs/ | vdd/docs/ | 12+ guides, comparisons, benchmarks | P3 (Documentation) | Good |
| vdd/tutorial/ | vdd/docs/tutorial.md | 30-minute walkthrough | P4 (Learning Experience) | Good |
| vdd/strategy.md | vdd/ | Research-backed strategy with 12 pillars | P0 (Internal VDD) | Good |
| vdd/tactics.md | vdd/ | This file | P0 (Internal VDD) | Good |
| vdd/vision.md | vdd/ | Vision and impact model | P0 (Internal VDD) | Good |
| api/sse.js | api/ | Vercel MCP endpoint — SSE + JSON-RPC 2.0 | P7 (Agent Integration), P12 (Universal Access) | Good |
| packages/vdd-engine | packages/ | TypeScript shared core — 15 phase functions | P12 (Universal Access) | Good |
| packages/vdd-mcp | packages/ | MCP server — 15 tools, stdio + SSE | P12 (Universal Access) | Good |
| packages/vdd-cli | packages/ | CLI binary — 15 subcommands, Commander | P12 (Universal Access) | Good |
| scripts/ | scripts/ | 4 installer & helper scripts | P13 (SEO & Awareness) | Good |
| community docs | vdd/docs/ | GOVERNANCE, SECURITY, CODE_OF_CONDUCT, CONTRIBUTING | P14 (Community) | Good |
| CHANGELOG.md | root | Versioned change history (1.5.0–1.5.4) | P3 (Documentation) | Good |
| LICENSE.md | root | MIT license | P13 | Good |

### Technical Debt Assessment

| Debt Item | Location | Severity | Impact on Strategy |
|-----------|----------|----------|-------------------|
| Gate check consistency across files | Multiple | Low | Minor drift risk (14→15 tool count needed) |
| api/sse.js duplicates engine.ts logic | api/, packages/ | Medium | Out-of-sync risk between SSE and engine |
| No automated consistency checker | None | Medium | Manual verification of 113 gates |
| Pending npm publish | packages/ | Low | CLI and MCP require local build |

### Reusable Assets

| Asset | How It Supports Strategy | Effort to Reuse |
|-------|------------------------|----------------|
| Markdown + HTML structure | Established format for all docs | Low |
| Goldratt S&T template | Every artifact uses same traceability pattern | Low |
| VDD chain | Dogfooded on this repo | Low |
| Zod type schemas | Shared validation for all packages | Low |
| MCP + CLI architecture | Extensible to other agents | Low |

## Gap Analysis

| Gap | Strategic Pillar Affected | Impact if Unaddressed |
|-----|--------------------------|----------------------|
| E2E chain execution shortcut | P1, P4 | Users must manually call 8+ commands to scaffold a project |
| Automated consistency checker | P1 | Stale counts across docs |
| npm publish for packages | P12 | Users must build locally |
| GitHub Wiki out of date | P13 | Wiki may not reflect latest features |
| No SSO/API key for MCP | P12 | No rate-limiting differentiation |
| vdd:e2e not documented in references/ | P3 | Reference docs miss new feature |

## Prioritized Action Items

| ID | Action Item | Priority | Strategy Pillar | Estimated Spec Size | Dependencies |
|----|------------|----------|----------------|--------------------|--------------|
| A-001 | Formalize VDD as an OpenCode skill | MUST ✅ DONE (delivered in simonplmak-cloud/vision-driven-design) | P1 (Skill Architecture) | L | None |
| A-019 | Create vdd/docs/tutorial.md | MUST ✅ DONE | P4 (Learning Experience) | M | A-005 |
| A-023 | Create vdd/docs/comparison.md | MUST ✅ DONE | P3 (Documentation) | S | None |
| A-025 | Draft community guidelines (CONTRIBUTING, CODE_OF_CONDUCT) | MUST ✅ DONE | P14 (Community) | M | A-024 |
| A-027 | Create vdd/docs/community-engagement.md | MUST ✅ DONE | P14 (Community) | M | A-025 |
| A-029 | Create vdd/docs/agent-sdk.md | MUST ✅ DONE | P7 (Agent Integration) | M | A-028 |
| A-031 | Create vdd/docs/awesome-lists.md | MUST ✅ DONE | P13 (SEO & Awareness) | S | None |
| A-032 | Publish vdd/docs/ci-quality-pipeline.md | MUST ✅ DONE | P13 (SEO & Awareness) | M | None |
| A-033 | Create vdd/docs/best-practice-benchmark.md | MUST ✅ DONE | P13 (SEO & Awareness) | M | None |
| A-034 | Create vdd/docs/compliance-evidence.md | MUST ✅ DONE | P13 (SEO & Awareness) | L | A-033 |
| A-035 | Create vdd/docs/star-growth-campaign.md | MUST ✅ DONE | P13 (SEO & Awareness) | M | A-025, A-031 |
| A-036 | Create vdd/docs/community-calls.md | MUST ✅ DONE | P14 (Community) | S | A-035 |
| A-038 | Build VDD universal access layer — MCP server (15 tools), CLI binary (`vdd`), shared engine module, npm-publishable package | MUST ✅ DONE (delivered in simonplmak-cloud/vision-driven-design) | P12 (Universal Access), P7 (Agent Integration) | L | A-019, A-023 |
| A-039 | Create domain-primers/safety-critical.md | MUST ✅ DONE | P2 (Domain Primers) | M | None |
| A-040 | Add compliance-evidence templates | MUST ✅ DONE | P13 (SEO & Awareness) | M | A-033, A-039 |
| A-041 | Create vdd/docs/impact-survey.md | SHOULD ✅ DONE | P13 (SEO & Awareness) | M | None |
| A-042 | Create vdd/docs/vdd-badge.md | SHOULD ✅ DONE | P13 (SEO & Awareness) | S | None |
| A-043 | Create vdd/docs/vision-canvas.md | SHOULD ✅ DONE | P4 (Learning Experience) | M | A-001 |
| A-044 | Create vdd/docs/whitepaper.md | SHOULD ✅ DONE | P13 (SEO & Awareness) | L | A-001, A-034 |
| A-045 | Create vdd/docs/demo-video-script.md | SHOULD ✅ DONE | P13 (SEO & Awareness) | M | A-001 |
| A-046 | Create vdd/docs/localization.md | COULD | P13 (SEO & Awareness) | M | None |
| A-047 | Create vdd/docs/telemetry.md | COULD | P7 (Agent Integration) | S | None |
| A-048 | Publish to npm (`@vdd/mcp`, `@vdd/cli`) | COULD | P12 (Universal Access) | M | A-038 |
| A-049 | Multi-language domain primers (KO, JA, ZH) | COULD | P2 (Domain Primers) | XL | A-046 |
| A-050 | Automated consistency checker for gate/anti-pattern/tool counts | COULD | P1 (Skill Architecture) | M | None |
| A-051 | GitHub Wiki sync with latest docs | COULD | P13 (SEO & Awareness) | S | None |
| A-052 | SSO / API key for MCP rate-limit tiers | COULD | P12 (Universal Access) | M | A-048 |

## Dependency Map

```
A-001 (Skill) ────┬──→ A-002 (Primer H) ──→ A-003 (Primer V) ──→ A-004 (Cklist, security)
                  │
                  ├──→ A-019 (Tutorial) ──┬──→ A-023 (Comparison)
                  │                       └──→ A-043 (Vision Canvas)
                  │
                  ├──→ A-038 (Universal Access — MCP + CLI)
                  │
                  └──→ A-044 (Whitepaper)

A-025 (Community) ──→ A-027 (Engagement) ──→ A-035 (Star Campaign) ──→ A-036 (Community Calls)

A-033 (Benchmark) ──→ A-034 (Compliance)
A-039 (Safety-Critical) ──→ A-040 (Evidence)
```

## Infrastructure Requirements

| Requirement | Domain | Priority | Notes |
|-------------|--------|----------|-------|
| Vercel deployment | Infrastructure | MUST | Auto-deploy from `main` branch |
| GitHub Pages | Infrastructure | MUST | `index.html` at simonplmak-cloud.github.io/vision-driven-design |
| OpenCode development server | Infrastructure | MUST | Local-only |
| GitHub Actions CI | Infrastructure | COULD | Run consistency checker on PR |
| npm registry | Infrastructure | COULD | For `@vdd/mcp` and `@vdd/cli` packages |
| Sentry (optional) | Infrastructure | COULD | Monitor MCP endpoint health |

## S&T Assumptions (Tactics → Specs)

**Necessity:** Spec-level breakdown is required to precisely define each action item's acceptance criteria before implementation.

**Achievability:** All remaining action items are documentation or package-build tasks — tooling and infrastructure are already in place.

**Sufficiency:** Each action item maps to a specific spec with measurable ACs; the full chain from vision to task is traceable per action item.

**Warnings:** npm publish and SSO require external service configuration outside this repo. Action items that touch community engagement must be paced to avoid burnout.
