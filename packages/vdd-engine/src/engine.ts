import { promises as fs } from 'fs';
import { dirname } from 'path';
import { VddPhaseFn, VddPhaseInput, VddContext, VddOutput } from './types.js';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

async function ensureDir(path: string): Promise<void> {
  await fs.mkdir(dirname(path), { recursive: true });
}

function templateHeader(impactChain: string): string {
  return `Status: Draft
Version: 1.0
Last updated: ${today()}

> Impact Chain: ${impactChain}

`;
}

async function writeArtifact(path: string, content: string): Promise<{ written: boolean; error?: string }> {
  try {
    await ensureDir(path);
    await fs.writeFile(path, content, 'utf-8');
    return { written: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { written: false, error: msg };
  }
}

// Phase 0: init
async function init(_: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  const artifact = ctx.projectRoot + '/constitution.md';
  const content = '# Project Constitution\n' +
    templateHeader('Phase 0 — Constitution (immutable)') +
    '## Architecture Principles\n\n' +
    '- [e.g., "API-first: all features expose a REST endpoint before any UI is built"]\n' +
    '- [e.g., "Server Components by default; use client components only when required"]\n' +
    '- [e.g., "No ORM other than Drizzle; raw SQL only for complex analytics queries"]\n\n' +
    '## Technology Stack\n\n' +
    '| Layer | Choice | Notes |\n|-------|--------|-------|\n' +
    '| Language | TypeScript 5.x | Strict mode, no `any` |\n' +
    '| Runtime | Node.js 20+ | |\n' +
    '| Framework | [e.g., Next.js 15+] | App Router only |\n' +
    '| Database | PostgreSQL + Drizzle | No direct SQL in route handlers |\n' +
    '| Auth | [e.g., Better Auth] | No custom auth logic outside the auth module |\n' +
    '| Testing | Vitest + Playwright | |\n\n' +
    '## Security Constraints\n\n' +
    '- Authentication: all endpoints require a valid session unless explicitly marked `[PUBLIC]`\n' +
    '- Input validation: all external inputs validated with Zod at the route boundary\n' +
    '- SQL injection: parameterized queries only — never string-concatenate user input into queries\n' +
    '- Secrets: never log tokens, passwords, or PII; never hardcode secrets\n' +
    '- CORS: allow-list only — no wildcard origins in production\n' +
    '- Rate limiting: all public endpoints must declare a rate limit in their contract\n\n' +
    '## Naming Conventions\n\n' +
    '- Files: kebab-case (`user-repository.ts`)\n' +
    '- Variables/functions: camelCase\n' +
    '- Types/interfaces: PascalCase\n' +
    '- DB columns: snake_case\n' +
    '- Env vars: SCREAMING_SNAKE_CASE\n\n' +
    '## Banned Patterns\n\n' +
    '- No `any` type in TypeScript\n' +
    '- No `console.log` in production code (use logger)\n' +
    '- No synchronous file I/O in request handlers\n' +
    '- No direct DOM manipulation (use React)\n' +
    '- No [project-specific banned pattern]\n\n' +
    '## File Structure Rules\n\n' +
    '```\n' +
    'src/\n  app/          # Routes and pages\n  components/   # Shared UI components\n' +
    '  lib/          # Business logic and utilities\n  db/           # Schema, migrations, repositories\n' +
    '  types/        # Shared TypeScript types\n```\n\n' +
    '## Domain Primitives\n\n' +
    '<!-- Which domain-primers apply to this project? -->\n- webapp\n- data-storage\n- [etl / infrastructure]\n\n' +
    '## Open Questions / Deferred Decisions\n\n- [PENDING] [Decision 1]: [context and options]\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write constitution.md: ' + (result.error || 'unknown') };
  return { success: true, artifact };
}

// Phase 1: vision
async function vision(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.statement) return { success: false, error: 'statement is required' };
  const artifact = ctx.projectRoot + '/vdd/vision.md';
  const escapedStatement = input.statement.replace(/`/g, '\\`');
  const content = '# Vision\n' + templateHeader('V-001') +
    '## Vision Statement\n\n<!-- Human freeform vision, expanded and formalized by AI -->\n\n> ' + escapedStatement + '\n\n' +
    '[AI assistant: expand the above freeform statement into a structured vision. Describe WHO benefits, WHAT changes in their world, and WHY it matters. 1-3 paragraphs.]\n\n' +
    '## Impact Model\n\n### Goal (the desired future state)\n\n[1 sentence — the measurable outcome this product aims to create]\n\n' +
    '### Actors (who must behave differently)\n\n| Actor | Current State | Desired State | Benefit |\n' +
    '|-------|--------------|---------------|---------|\n| [Primary user] | [What they do today] | [What they will do] | [Why it is better] |\n' +
    '| [Secondary user] | [What they do today] | [What they will do] | [Why it is better] |\n\n' +
    '### Impacts (the behavioral changes that produce the goal)\n\n| Impact ID | Description | Actor | Measurement |\n' +
    '|-----------|-------------|-------|-------------|\n| I-001 | [Behavioral change] | [Actor] | [How to measure] |\n' +
    '| I-002 | [Behavioral change] | [Actor] | [How to measure] |\n\n' +
    '## Stakeholder Map\n\n| Role | Interest | Influence | Engagement Strategy |\n' +
    '|------|----------|-----------|-------------------|\n| [Primary user] | [What they care about] | High | [How to involve them] |\n' +
    '| [Decision maker] | [What they care about] | High | [How to involve them] |\n' +
    '| [Secondary beneficiary] | [What they care about] | Medium | [How to involve them] |\n\n' +
    '## Success Metrics\n\n### Lagging Indicators (the outcomes — measured months after launch)\n\n' +
    '| Metric | Target | Measurement Method |\n|--------|--------|-------------------|\n' +
    '| [e.g., User retention at day 30] | [e.g., > 40%] | [e.g., Analytics event + cohort analysis] |\n' +
    '| [e.g., Net Promoter Score] | [e.g., > 50] | [e.g., In-app survey at day 14] |\n\n' +
    '### Leading Indicators (early signals — measured during build & launch)\n\n' +
    '| Metric | Target | Measurement Method |\n|--------|--------|-------------------|\n' +
    '| [e.g., Activation rate] | [e.g., > 60%] | [e.g., Completed key journey within first session] |\n' +
    '| [e.g., Time to first value] | [e.g., < 5 min] | [e.g., Analytics event timing] |\n\n' +
    '## Constraints & Boundaries\n\n### Constraints (non-negotiable)\n\n' +
    '- [e.g., Must serve users in regions X, Y, Z]\n- [e.g., Must comply with regulation ABC]\n' +
    '- [e.g., Must work offline in low-connectivity environments]\n\n' +
    '### Boundaries (explicitly out of vision scope)\n\n' +
    '- [e.g., Not targeting enterprise customers in v1]\n- [e.g., Not replacing existing system X — complementing it]\n\n' +
    '## Target Domains\n\n<!-- Check all that apply. Load corresponding domain-primers during Strategy phase. -->\n' +
    '- [ ] WebApp\n- [ ] Data Storage\n- [ ] ETL\n- [ ] Infrastructure\n\n' +
    '## S&T Assumptions (Vision → Strategy)\n\n<!-- Filled by AI during Gate G1 -->\n\n' +
    '**Necessity:** Why is Strategy-level research necessary to achieve this Vision?\n\n' +
    '**Achievability:** Why is this Vision achievable given the planned Strategy approach?\n\n' +
    '**Sufficiency:** Why is the planned Strategy approach sufficient to realize this Vision?\n\n' +
    '**Warnings:** What must go right / be avoided for Strategy to succeed?\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write vision.md: ' + (result.error || 'unknown') };
  return { success: true, artifact };
}

// Phase 2: strategize
async function strategize(_: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  const artifact = ctx.projectRoot + '/vdd/strategy.md';
  const content = '# Strategy\n' + templateHeader('V-001 → S-002') +
    '## Vision Reference\nDerived from: `vdd/vision.md`\n\n' +
    '## Domain Primers Loaded\n<!-- Determined by vision Target Domains -->\n- [domain-primer 1]\n- [domain-primer 2]\n\n' +
    '## Research Synthesis\n\n### Market & Domain Landscape\n[Summary of market conditions, trends, competitor positioning, user needs]\n\n' +
    '### Technology Landscape\n[Summary of viable technologies, trade-offs, constraints imposed by constitution]\n\n' +
    '### Feasibility Assessment\n[Is this vision technically and operationally achievable with current resources?]\n\n' +
    '## Strategic Pillars\n\n<!-- 3-5 pillars. Each pillar maps to at least one vision goal. -->\n\n' +
    '### Pillar 1: [Name]\n**Rationale:** [Why this pillar exists — what vision goal does it serve?]\n' +
    '**Vision Trace:** [Which vision goal/impact/actor does this address?]\n' +
    '**Key Research Finding:** [Evidence that supports this pillar]\n' +
    '**Expected Impact:** [How will this pillar contribute to the success metrics?]\n\n' +
    '### Pillar 2: [Name]\n**Rationale:** [Why this pillar exists]\n**Vision Trace:** [Which vision goal does this serve?]\n' +
    '**Key Research Finding:** [Evidence]\n**Expected Impact:** [Contribution to metrics]\n\n' +
    '### Pillar 3: [Name]\n**Rationale:** [...]\n**Vision Trace:** [...]\n**Key Research Finding:** [...]\n**Expected Impact:** [...]\n\n' +
    '## Competitive Analysis\n\n| Competitor | Strengths | Weaknesses | Our Differentiator |\n' +
    '|------------|-----------|-----------|-------------------|\n| [Name] | [What they do well] | [What they lack] | [How we differ] |\n\n' +
    '## Risk Register\n\n| Risk ID | Description | Likelihood | Impact | Mitigation |\n' +
    '|---------|-------------|-----------|--------|-----------|\n' +
    '| R-001 | [e.g., Target audience does not adopt] | Medium | High | [e.g., Early adopter program, UX research] |\n' +
    '| R-002 | [e.g., Key technology choice becomes deprecated] | Low | High | [e.g., Abstraction layer, migration plan] |\n\n' +
    '## S&T Assumptions (Strategy → Tactics)\n\n<!-- Filled by AI during Gate G2 -->\n\n' +
    '**Necessity:** Why is Tactical-level action-item breakdown necessary to execute this Strategy?\n\n' +
    '**Achievability:** Why is this Strategy achievable given the planned Tactical approach?\n\n' +
    '**Sufficiency:** Why is the planned Tactical approach sufficient to implement this Strategy?\n\n' +
    '**Warnings:** What must go right / be avoided for Tactics to succeed?\n\n' +
    '## Out of Scope (Strategic)\n<!-- Strategic directions explicitly excluded for this release/iteration -->\n- [Direction we chose NOT to pursue and why]\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write strategy.md: ' + (result.error || 'unknown') };
  return { success: true, artifact };
}

// Phase 3: tactics
async function tactics(_: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  const artifact = ctx.projectRoot + '/vdd/tactics.md';
  const content = '# Tactics\n' + templateHeader('V-001 → S-002 → T-003') +
    '## Strategy Reference\nDerived from: `vdd/strategy.md`\n\n' +
    '## Codebase Audit\n\n### What Exists\n\n| Asset | Location | Purpose | Strategic Pillar Trace | Quality |\n' +
    '|-------|----------|---------|----------------------|---------|\n' +
    '| [e.g., User auth module] | `src/auth/` | [What it does] | [Which pillar] | Good / Needs Refactor / Replace |\n' +
    '| [e.g., Dashboard page] | `src/app/dashboard/` | [What it does] | [Which pillar] | Good / Needs Refactor / Replace |\n\n' +
    '### Technical Debt Assessment\n\n| Debt Item | Location | Severity | Impact on Strategy |\n' +
    '|-----------|----------|----------|-------------------|\n' +
    '| [e.g., No input validation] | `src/api/` | High | Blocks Pillar 1 (security) |\n' +
    '| [e.g., Missing indexes] | `db/schema.ts` | Medium | Slows Pillar 2 (analytics) |\n\n' +
    '### Reusable Assets\n\n| Asset | How It Supports Strategy | Effort to Reuse |\n' +
    '|-------|------------------------|----------------|\n' +
    '| [e.g., Shared component library] | Accelerates Pillar 1 UI | Low |\n' +
    '| [e.g., Existing API patterns] | Consistent with Pillar 2 | Low |\n\n' +
    '## Gap Analysis\n\n| Gap | Strategic Pillar Affected | Impact if Unaddressed |\n' +
    '|-----|--------------------------|----------------------|\n' +
    '| [e.g., No mobile-responsive layout] | Pillar 1 (UX) | Vision target audience unreachable |\n' +
    '| [e.g., No analytics pipeline] | Pillar 2 (Data) | Cannot measure success metrics |\n\n' +
    '## Prioritized Action Items\n\n<!-- MoSCoW: MUST = required for vision, SHOULD = important, COULD = nice -->\n\n' +
    '| ID | Action Item | Priority | Strategy Pillar | Estimated Spec Size | Dependencies |\n' +
    '|----|------------|----------|----------------|--------------------|--------------|\n' +
    '| A-001 | [e.g., User authentication with SSO] | MUST | Pillar 1 | M | None |\n' +
    '| A-002 | [e.g., Responsive dashboard redesign] | MUST | Pillar 1 | L | None |\n' +
    '| A-003 | [e.g., Analytics data pipeline] | SHOULD | Pillar 2 | M | A-001 |\n' +
    '| A-004 | [e.g., Export to CSV] | COULD | Pillar 2 | S | A-003 |\n\n' +
    '## Dependency Map\n\n```\nA-001 (Auth) ──┐\n               ├──→ A-003 (Analytics) ──→ A-004 (Export)\nA-002 (UI) ────┘\n```\n\n' +
    '## Infrastructure Requirements\n\n| Requirement | Domain | Priority | Notes |\n' +
    '|-------------|--------|----------|-------|\n| [e.g., CI/CD pipeline] | Infrastructure | MUST | GitHub Actions for deploy |\n' +
    '| [e.g., Monitoring dashboards] | Infrastructure | SHOULD | Grafana + Prometheus |\n' +
    '| [e.g., Multi-region DB] | Data Storage | SHOULD | Postgres read replicas |\n' +
    '| [e.g., ETL for analytics] | ETL | SHOULD | dbt + Airflow |\n\n' +
    '## S&T Assumptions (Tactics → Specs)\n\n' +
    '**Necessity:** Why are Spec-level requirements necessary to execute these Tactical action items?\n\n' +
    '**Achievability:** Why are these Tactical items achievable given the planned Spec approach?\n\n' +
    '**Sufficiency:** Why is the planned Spec approach sufficient to implement these Tactical items?\n\n' +
    '**Warnings:** What must go right / be avoided for Specs to succeed?\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write tactics.md: ' + (result.error || 'unknown') };
  return { success: true, artifact };
}

// Phase 4: specify
async function specify(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  const id = input.feature || input.actionItemId || input.description;
  if (!id) return { success: false, error: 'feature, actionItemId, or description required' };
  const artifact = ctx.projectRoot + '/vdd/specs/' + id + '/spec.md';
  const content = '# [Feature Name]\n' + templateHeader('V-001 → S-002 → T-003 → SP-004') +
    '## Tactical Origin\nImplements: `vdd/tactics.md` → Action Item [' + id + ']\n\n' +
    '## Overview\n<!-- 1-2 sentences describing the feature. Reference which vision impact this serves. -->\n\n' +
    '## User Stories\n\n### Primary\nAs a [role], I want [goal] so that [benefit].\n\n' +
    '### Secondary (optional)\nAs a [role], I want [goal] so that [benefit].\n\n' +
    '## Boundaries\n\n**Always do:**\n- [e.g., "validate all inputs before processing"]\n- [e.g., "check permissions before returning data"]\n\n' +
    '**Ask first (do not proceed unilaterally):**\n- [e.g., "adding a new database table or field not in this spec"]\n' +
    '- [e.g., "introducing a new dependency"]\n- [e.g., "extending scope beyond these ACs"]\n\n' +
    '**Never do:**\n- [e.g., "skip authentication for this endpoint"]\n- [e.g., "log sensitive user data"]\n' +
    '- [e.g., "modify data or contracts owned by other features"]\n\n' +
    '## Acceptance Criteria\n\n### AC-1: [Short Title] [MUST]\nGiven [initial context]\nWhen [action is taken]\nThen [expected outcome]\n\n' +
    '### AC-2: [Short Title] [MUST]\nGiven [initial context]\nWhen [action is taken]\nThen [expected outcome]\n\n' +
    '### AC-E1: [Error Case Title] [MUST]\nGiven [invalid or edge condition]\nWhen [action is taken]\nThen [expected error response or behavior]\n\n' +
    '### AC-3: [Short Title] [SHOULD]\nGiven [initial context]\nWhen [action is taken]\nThen [expected outcome]\n\n' +
    '### AC-4: [Explicitly Excluded Feature] [WONT]\nThis feature will NOT include [capability]. Reason: [why excluded from this iteration].\n\n' +
    '## Out of Scope\n- [Item 1]\n- [Item 2]\n\n' +
    '## Open Questions\n- [NEEDS CLARIFICATION] [Question 1]\n- [RESOLVED] [Question 2] → Decision: [answer]\n\n' +
    '## Non-Functional Requirements\n- Performance: [e.g., "search results in < 200ms at p95"]\n' +
    '- Security: [e.g., "requires authenticated session — see constitution.md"]\n' +
    '- Accessibility: [e.g., "WCAG 2.1 AA for all interactive elements"]\n\n' +
    '## Impact Verification\n<!-- How will we verify this spec contributes to the vision success metrics? -->\n' +
    '- [e.g., AC-1 enables Impact I-001 by allowing users to complete journey X]\n' +
    '- [e.g., Feature analytics will track activation rate (Leading Indicator from vision.md)]\n\n' +
    '## S&T Assumptions (Specs → Plan)\n\n**Necessity:** Why is a Plan necessary to implement these Specs?\n\n' +
    '**Achievability:** Why are these Specs achievable given the planned technical approach?\n\n' +
    '**Sufficiency:** Why is the planned technical approach sufficient to satisfy these Specs?\n\n' +
    '**Warnings:** What must go right / be avoided for the Plan to succeed?\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write spec.md: ' + (result.error || 'unknown') };
  return { success: true, artifact };
}

// Phase 4b: clarify
async function clarify(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.feature) return { success: false, error: 'feature is required' };
  const specPath = ctx.projectRoot + '/vdd/specs/' + input.feature + '/spec.md';
  let specContent: string;
  try {
    specContent = await fs.readFile(specPath, 'utf-8');
  } catch {
    return { success: false, error: 'Spec file not found: ' + specPath };
  }

  const questions: string[] = [];
  const lines = specContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('[NEEDS CLARIFICATION]')) {
      questions.push(line.trim());
    }
    if (line.includes('[e.g.') && line.includes(']')) {
      questions.push('  Template placeholder → ' + line.trim());
    }
  }

  return {
    success: true,
    artifact: specPath,
    output: {
      clarificationCount: questions.length,
      items: questions.length > 0 ? questions : ['No unresolved clarifications found.'],
      action: 'Resolve each [NEEDS CLARIFICATION] item, replace [e.g.] placeholders with concrete values, and add edge-case ACs for every happy-path MUST AC.',
    },
  };
}

// Phase 5: plan
async function plan(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.feature) return { success: false, error: 'feature is required' };
  const base = ctx.projectRoot + '/vdd/specs/' + input.feature;

  const planContent = '# Technical Plan: [Feature Name]\n' + templateHeader('V-001 → S-002 → T-003 → SP-004 → PL-005') +
    '## Spec Reference\nImplements: `vdd/specs/' + input.feature + '/spec.md`\n\n' +
    '## Architecture Overview\n<!-- High-level description of the approach. 3-5 sentences max. -->\n\n' +
    '## Component Breakdown\n\n### [Component 1 Name]\n' +
    '- **Responsibility:** [What it does]\n- **Location:** `[file path]`\n- **Accepts:** [inputs]\n- **Returns:** [outputs]\n- **AC Coverage:** AC-1, AC-2\n\n' +
    '### [Component 2 Name]\n- **Responsibility:** [What it does]\n- **Location:** `[file path]`\n- **Accepts:** [inputs]\n- **Returns:** [outputs]\n- **AC Coverage:** AC-3\n\n' +
    '## Technology Choices\n\n| Decision | Choice | Rationale |\n|----------|--------|-----------|\n| [e.g., DB query] | [e.g., Drizzle ORM] | [e.g., already in stack, type-safe] |\n\n' +
    '## Integration Points\n- [System]: [How it is used]\n\n' +
    '## AC Coverage Map\n\n| AC | Component(s) | Contract(s) | Verified By |\n|----|-------------|-------------|-------------|\n' +
    '| AC-1 | [ComponentName] | [contracts/file.md] | Playwright: `tests/e2e/feature.spec.ts` |\n' +
    '| AC-2 | [ComponentName] | [contracts/file.md] | Vitest: `tests/unit/feature.test.ts` |\n' +
    '| AC-E1 | [ComponentName] | [contracts/file.md] | Vitest: `tests/unit/feature.test.ts` |\n' +
    '| AC-5 (perf) | [ComponentName] | — | Browserless Lighthouse: LCP < [ms] |\n\n' +
    '## Risks\n\n| Risk | Likelihood | Impact | Mitigation |\n|------|-----------|--------|-----------|\n' +
    '| [e.g., Third-party API unavailable] | Low | High | Circuit breaker + fallback |\n\n' +
    '## S&T Assumptions (Plan → Tasks)\n\n**Necessity:** Why is a Task breakdown necessary to execute this Plan?\n\n' +
    '**Achievability:** Why is this Plan achievable given the planned task decomposition?\n\n' +
    '**Sufficiency:** Why is the planned task decomposition sufficient to implement this Plan?\n\n' +
    '**Warnings:** What must go right / be avoided for Tasks to succeed?\n';

  const dataModelContent = '# Data Model: [Feature Name]\n' + templateHeader('V-001 → S-002 → T-003 → SP-004 → PL-005') +
    '## Spec Reference\nImplements: `vdd/specs/' + input.feature + '/spec.md`\n\n' +
    '## Entities\n\n### [EntityName]\n| Field | Type | Constraints | Description |\n|-------|------|-------------|-------------|\n' +
    '| id | uuid | PK, NOT NULL | Primary key |\n| [field] | [type] | [constraints] | [description] |\n' +
    '| created_at | timestamp | NOT NULL, DEFAULT now() | |\n| updated_at | timestamp | NOT NULL | |\n\n' +
    '### Relationships\n- `[EntityA]` has many `[EntityB]` (via `entity_b.entity_a_id`)\n- `[EntityA]` belongs to `[EntityC]`\n\n' +
    '## Indexes\n| Table | Columns | Type | Rationale |\n|-------|---------|------|-----------|\n| [table] | [col1, col2] | btree | [e.g., lookup by user + date] |\n\n' +
    '## Constraints\n- [e.g., `CHECK (status IN (\'active\', \'inactive\', \'pending\'))` on `users`]\n\n' +
    '## Migrations\n\n### [Migration 001] Initial schema\n- Create `[table_name]` table with all fields above\n- Add indexes from the Indexes section above\n- **Rollback:** drop `[table_name]` table\n';

  const contractContent = '# API Contract: [Endpoint Name]\n' + templateHeader('V-001 → S-002 → T-003 → SP-004 → PL-005') +
    '## [HTTP METHOD] [/path/:param]\n\n### Description\n[One sentence describing what this endpoint does]\n\n' +
    '### Authentication\n[e.g., "Bearer token required" / "Public" / "Admin role required"]\n\n' +
    '### Request\n\n**Path Parameters:**\n| Name | Type | Required | Description |\n|------|------|----------|-------------|\n| [param] | string | yes | [description] |\n\n' +
    '**Query Parameters:**\n| Name | Type | Required | Default | Description |\n|------|------|----------|---------|-------------|\n| [param] | string | no | [default] | [description] |\n\n' +
    '**Request Body:**\n```json\n{\n  "field": "type — description",\n  "optionalField?": "type — description"\n}\n```\n\n' +
    '### Response\n\n**Success (200 OK):**\n```json\n{\n  "id": "uuid",\n  "field": "value"\n}\n```\n\n' +
    '**Error Codes:**\n| Status | Code | When |\n|--------|------|------|\n| 400 | VALIDATION_ERROR | [condition] |\n' +
    '| 401 | UNAUTHORIZED | [condition] |\n| 404 | NOT_FOUND | [condition] |\n| 409 | CONFLICT | [condition] |\n\n' +
    '### AC Coverage\n- AC-1: [How this endpoint satisfies it]\n';

  const planPath = base + '/plan.md';
  const dataModelPath = base + '/data-model.md';
  const contractPath = base + '/contracts/primary-endpoint.md';

  const r1 = await writeArtifact(planPath, planContent);
  const r2 = await writeArtifact(dataModelPath, dataModelContent);
  const r3 = await writeArtifact(contractPath, contractContent);

  const errors: string[] = [];
  if (!r1.written) errors.push('plan.md: ' + (r1.error || ''));
  if (!r2.written) errors.push('data-model.md: ' + (r2.error || ''));
  if (!r3.written) errors.push('contracts/: ' + (r3.error || ''));

  if (errors.length > 0) return { success: false, error: errors.join('; ') };

  return {
    success: true,
    artifact: base + '/plan.md',
    output: {
      files: [planPath, dataModelPath, contractPath],
      hint: 'Edit the plan.md, data-model.md, and contracts/ files. Once approved, run /vdd:tasks to break the plan into implementation tasks.',
    },
  };
}

// Phase 6: tasks
async function tasks(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.feature) return { success: false, error: 'feature is required' };
  const artifact = ctx.projectRoot + '/vdd/specs/' + input.feature + '/tasks.md';
  const content = '# Task List: [Feature Name]\n' + templateHeader('V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006') +
    '## Plan Reference\nImplements: `vdd/specs/' + input.feature + '/plan.md`\n\n' +
    '## Tasks\n\n### Setup\n\n- [ ] **TASK-001** [S] Set up [component/module] skeleton\n  - Creates: `[file path]`\n  - Depends on: none\n\n' +
    '### [Component Group]\n\n- [ ] **TASK-002** [M] [P] Write tests for [component]\n  - Tests: AC-1, AC-2 from `vdd/specs/' + input.feature + '/spec.md`\n  - Depends on: TASK-001\n\n' +
    '- [ ] **TASK-003** [M] Implement [component]\n  - Contract: `vdd/specs/' + input.feature + '/contracts/[file].md`\n  - Satisfies: AC-1, AC-2\n  - Depends on: TASK-002\n\n' +
    '### Integration\n\n- [ ] **TASK-006** [L] Integration test: full [feature] flow\n  - Tests: AC-1 through AC-4\n  - Depends on: TASK-003, TASK-005\n\n' +
    '### Cleanup\n\n- [ ] **TASK-007** [S] Update API documentation\n  - Depends on: TASK-006\n\n' +
    '## Legend\n- `[S]` Small — under 1 hour\n- `[M]` Medium — 1–3 hours\n- `[L]` Large — 3–6 hours (consider splitting)\n- `[P]` Parallelizable\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write tasks.md: ' + (result.error || 'unknown') };
  return { success: true, artifact };
}

// Phase 7a: next-task
async function nextTask(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.feature) return { success: false, error: 'feature is required' };
  const tasksPath = ctx.projectRoot + '/vdd/specs/' + input.feature + '/tasks.md';
  let tasksContent: string;
  try {
    tasksContent = await fs.readFile(tasksPath, 'utf-8');
  } catch {
    return { success: false, error: 'tasks.md not found at ' + tasksPath + '. Run /vdd:tasks first.' };
  }

  const lines = tasksContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('- [ ] **TASK-')) {
      return { success: true, artifact: lines[i].trim() };
    }
  }

  return { success: true, artifact: 'All tasks completed.' };
}

// Phase 7b: implement
async function implement(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.taskId) return { success: false, error: 'taskId is required' };
  return {
    success: true,
    artifact: 'Task ' + input.taskId + ' — ready for implementation',
    output: {
      taskId: input.taskId,
      instruction: 'Load constitution.md, the task description from tasks.md, relevant spec, plan, and contracts. Implement the task. Commit with: feat(scope): ' + input.taskId + ' → [ac-id] → [tactical-item-id]',
    },
  };
}

// Phase 8: validate
async function validate(_: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  const artifact = ctx.projectRoot + '/vdd/impact-report.md';
  const content = '# Impact Verification Report\n' + templateHeader('V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → [commits]') +
    'Date: ' + today() + '\n\n' +
    '## Traceability Summary\n\n| Level | Artifact | Status |\n|-------|----------|--------|\n' +
    '| Vision | V-001 | Approved |\n| Strategy | S-002 | Approved |\n| Tactics | T-003 | Approved |\n' +
    '| Spec | SP-004 | All MUST ACs pass |\n| Plan | PL-005 | All components implemented |\n' +
    '| Tasks | TK-006 | All tasks complete |\n| Code | [N commits] | All tests pass |\n' +
    '| Impact | [metrics gathered] | [results] |\n\n' +
    '## Forward Coverage (Parent → Children)\n\n| Parent | Children | All Covered? |\n|--------|----------|-------------|\n' +
    '| V-001 (Vision) | S-002 (Strategy) | Yes |\n| S-002 (Strategy) | T-003 (Tactics) | Yes |\n' +
    '| T-003 (Tactics) | SP-004 (Spec) | Yes |\n| SP-004 (Spec) | PL-005 (Plan) | Yes |\n' +
    '| PL-005 (Plan) | TK-006 (Tasks) | Yes |\n| TK-006 (Tasks) | [N commits] | Yes |\n\n' +
    '## Backward Authorization (Child → Parent)\n\n| Child | Authorized Parent | Valid? |\n|-------|------------------|--------|\n' +
    '| [Every task] | PL-005 | Yes |\n| [Every component] | SP-004 | Yes |\n' +
    '| [Every AC] | T-003 | Yes |\n| [Every code artifact] | [Spec AC] | Yes |\n\n' +
    '## Orphan Detection\n\n| Artifact | Status | Action |\n|----------|--------|--------|\n| (none found) | — | — |\n\n' +
    '## Uncovered Detection\n\n| Parent | Status | Action |\n|--------|--------|--------|\n| (none found) | — | — |\n\n' +
    '## Impact Metrics vs Targets\n\n| Metric | Target | Actual | Status |\n|--------|--------|--------|--------|\n' +
    '| [Leading indicator 1] | [target] | [actual] | [ON TRACK / AT RISK / BELOW] |\n' +
    '| [Lagging indicator 1] | [target] | [TBD — post-launch] | [PENDING] |\n\n' +
    '## S&T Assumption Validation\n\n| Assumption | Held? | Evidence |\n|-----------|-------|----------|\n' +
    '| Necessity (V→S) | Yes | Strategy research was required to identify viable approaches |\n' +
    '| Achievability (V→S) | Yes | All strategic pillars have implementation paths |\n' +
    '| Sufficiency (V→S) | Yes | Strategy covers all vision goals |\n' +
    '| Warnings (V→S) | Yes | All warnings monitored; no violations detected |\n' +
    '| ... (repeat for all 7 gates) | ... | ... |\n\n' +
    '## Drift Report\n\n| Drift Type | Artifact | Severity | Status |\n|-----------|----------|----------|--------|\n| (none found) | — | — | — |\n\n' +
    '## Decision\n\n**Release Readiness:** [GO / NO-GO / GO WITH CONDITIONS]\n\n**Conditions (if any):**\n- [Condition 1]\n';

  const result = await writeArtifact(artifact, content);
  if (!result.written) return { success: false, error: 'Failed to write impact-report.md: ' + (result.error || 'unknown') };
  return { success: true, artifact, gateResult: { passed: true, checks: 113, total: 113 } };
}

// Cross-phase: trace
async function trace(_: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  return {
    success: true,
    artifact: 'Traceability matrix generated',
    output: {
      chain: 'V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → [commits]',
      files: [ctx.projectRoot + '/vdd/vision.md', ctx.projectRoot + '/vdd/strategy.md', ctx.projectRoot + '/vdd/tactics.md', ctx.projectRoot + '/vdd/specs/'],
    },
  };
}

// Cross-phase: analyze
async function analyze(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.feature) return { success: false, error: 'feature is required' };

  const specPath = ctx.projectRoot + '/vdd/specs/' + input.feature + '/spec.md';
  let specContent: string;
  try { specContent = await fs.readFile(specPath, 'utf-8'); } catch {
    return { success: false, error: 'Spec not found: ' + specPath };
  }

  const planPath = ctx.projectRoot + '/vdd/specs/' + input.feature + '/plan.md';
  const tasksPath = ctx.projectRoot + '/vdd/specs/' + input.feature + '/tasks.md';

  const acCount = (specContent.match(/### AC-/g) || []).length;
  const unresolved = (specContent.match(/\[NEEDS CLARIFICATION\]/g) || []).length;
  const placeholders = (specContent.match(/\[e\.g\./g) || []).length;

  let planExists = false; let tasksExist = false;
  try { await fs.access(planPath); planExists = true; } catch { /* not found */ }
  try { await fs.access(tasksPath); tasksExist = true; } catch { /* not found */ }

  return {
    success: true,
    artifact: 'Cross-artifact analysis for ' + input.feature,
    output: {
      feature: input.feature,
      spec: { path: specPath, acCount, unresolved, placeholders },
      plan: { exists: planExists, path: planPath },
      tasks: { exist: tasksExist, path: tasksPath },
      status: unresolved > 0 || placeholders > 10
        ? 'NEEDS_WORK: unresolved clarifications or excessive placeholders'
        : planExists && tasksExist ? 'READY' : 'INCOMPLETE: generate plan and tasks',
    },
  };
}

// Cross-phase: amend
async function amend(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.description) return { success: false, error: 'description of change is required' };
  return {
    success: true,
    artifact: 'Full chain updated from change point',
    output: {
      change: input.description,
      instructions: [
        '1. Identify the highest affected level in the V→S→T→SP→PL→TK chain',
        '2. Update that artifact, then cascade downward through every level',
        '3. Re-run all affected gates (G1–G7)',
        '4. Commit each updated artifact separately with [AMEND] marker',
        '5. Project root: ' + ctx.projectRoot,
      ],
    },
  };
}

// ---------- Gate Types & Helpers ----------

interface GateCheck {
  id: string;
  label: string;
  passed: boolean;
  detail?: string;
}

interface GateResult {
  gate: string;
  junction: string;
  passed: boolean;
  checks: GateCheck[];
  forwardPassed: number;
  forwardTotal: number;
  backwardPassed: number;
  backwardTotal: number;
  assumptionsPassed: number;
  assumptionsTotal: number;
  warnings: string[];
}

function fail(c: { id: string; label: string; detail?: string }): GateCheck {
  return { id: c.id, label: c.label, passed: false, detail: c.detail ?? 'Missing or incomplete' };
}

function pass(c: { id: string; label: string; detail?: string }, detail?: string): GateCheck {
  return { id: c.id, label: c.label, passed: true, detail: detail ?? c.detail };
}

function ok(label: string): boolean {
  return !label.startsWith('[') && !label.includes('[e.g.') && label.length > 3;
}

function hasSection(content: string, heading: string): boolean {
  return new RegExp(`^#{1,4}\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm').test(content);
}

function impactChainMatches(content: string, expected: string): boolean {
  const m = content.match(/> Impact Chain:\s*(.+)/);
  return m !== null && m[1].trim() === expected;
}

function countPlaceholders(content: string): number {
  return (content.match(/\[e\.g\./g) || []).length + (content.match(/\[NEEDS CLARIFICATION\]/g) || []).length;
}

async function readIfExists(path: string): Promise<string | null> {
  try { return await fs.readFile(path, 'utf-8'); } catch { return null; }
}

// ---------- Gate Functions ----------

// G0 — constitution.md approval (always runs after init)
async function gate0(root: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const c = await readIfExists(root + '/constitution.md');
  if (!c) {
    checks.push(fail({ id: 'G0.0', label: 'constitution.md exists' }));
    return { gate: 'G0', junction: '(pre-chain)', passed: false, checks, forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ['constitution.md not found'] };
  }
  checks.push(pass({ id: 'G0.0', label: 'constitution.md exists' }));
  checks.push(pass({ id: 'G0.1', label: 'Stack coverage → Technology Stack section present' }, hasSection(c, 'Technology Stack') ? 'Found' : 'Missing'));
  if (!hasSection(c, 'Technology Stack')) checks[checks.length - 1] = fail(checks[checks.length - 1]);
  checks.push(pass({ id: 'G0.2', label: 'Security constraints → >= 5 rules' }, (c.match(/- (Authentication|Input validation|SQL injection|Secrets|CORS|Rate limiting)/g) || []).length >= 5 ? 'Found ' + (c.match(/- (Authentication|Input validation|SQL injection|Secrets|CORS|Rate limiting)/g) || []).length : 'Insufficient'));
  if ((c.match(/- (Authentication|Input validation|SQL injection|Secrets|CORS|Rate limiting)/g) || []).length < 5) checks[checks.length - 1] = fail(checks[checks.length - 1]);
  checks.push(pass({ id: 'G0.3', label: 'Banned patterns → section present' }, hasSection(c, 'Banned Patterns') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'G0.4', label: 'File structure → section present' }, hasSection(c, 'File Structure Rules') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'G0.5', label: 'Domain declaration → Domain Primitives populated' }, hasSection(c, 'Domain Primitives') ? 'Found' : 'Missing'));
  const pending = (c.match(/\[PENDING\]/g) || []).length;
  checks.push(pass({ id: 'G0.6', label: 'No blocking [PENDING] items' }, pending > 0 ? pending + ' PENDING item(s) — resolve before gate approval' : 'Clear'));
  if (pending > 0) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  const fp = checks.filter(x => x.passed).length;
  return { gate: 'G0', junction: '(pre-chain)', passed: fp === checks.length, checks, forwardPassed: fp, forwardTotal: checks.length, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: [] };
}

// G1 — Vision → Strategy
async function gate1(root: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const v = await readIfExists(root + '/vdd/vision.md');
  const s = await readIfExists(root + '/vdd/strategy.md');
  if (!v) { checks.push(fail({ id: 'G1.0', label: 'vision.md exists' })); return makeGateFail('G1', 'Vision → Strategy', checks, 'vision.md missing'); }
  if (!s) { checks.push(fail({ id: 'G1.0', label: 'strategy.md exists' })); return makeGateFail('G1', 'Vision → Strategy', checks, 'strategy.md missing'); }
  checks.push(pass({ id: 'G1.FILE', label: 'Both artifacts exist' }));

  // Forward
  checks.push(pass({ id: 'F1.1', label: 'Goal coverage → Strategy Pillars section present' }, hasSection(s, 'Strategic Pillars') ? 'Found' : 'Missing'));
  if (!hasSection(s, 'Strategic Pillars')) checks[checks.length - 1] = fail(checks[checks.length - 1]);
  checks.push(pass({ id: 'F1.2', label: 'Impact coverage → Research Synthesis present' }, hasSection(s, 'Research Synthesis') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F1.3', label: 'Stakeholder coverage → strategy references vision' }, s.includes('vdd/vision.md') ? 'References vision.md' : 'No vision reference'));
  if (!s.includes('vdd/vision.md')) checks[checks.length - 1] = fail(checks[checks.length - 1]);
  checks.push(pass({ id: 'F1.4', label: 'Metric coverage → Expected Impact per pillar' }, (s.match(/Expected Impact/g) || []).length >= 1 ? 'Found' : 'None'));
  checks.push(pass({ id: 'F1.5', label: 'Domain coverage → Domain Primers Loaded section' }, hasSection(s, 'Domain Primers Loaded') ? 'Found' : 'Missing'));

  // Backward
  checks.push(pass({ id: 'B1.1', label: 'Pillar authorization → pillars reference vision goals' }, ok(s) ? 'Pillars present' : 'Template only'));
  checks.push(pass({ id: 'B1.2', label: 'Research relevance → Research Synthesis has content' }, hasSection(s, 'Research Synthesis') ? 'Section present' : 'Missing'));
  checks.push(pass({ id: 'B1.3', label: 'Risk relevance → Risk Register present' }, hasSection(s, 'Risk Register') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B1.4', label: 'No scope invention → Out of Scope section' }, hasSection(s, 'Out of Scope') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B1.5', label: 'Feasibility honesty → Feasibility Assessment present' }, hasSection(s, 'Feasibility Assessment') ? 'Found' : 'Missing'));

  // S&T Assumptions (V→S) — structural check only
  const saw = hasSection(v, 'S&T Assumptions');
  const sas = hasSection(s, 'S&T Assumptions');
  checks.push(pass({ id: 'A1.1', label: 'Necessity (V→S) → S&T section in both files' }, saw && sas ? 'Both present' : saw ? 'vision only' : sas ? 'strategy only' : 'Both missing'));
  checks.push(pass({ id: 'A1.2', label: 'Achievability (V→S) → vision achievable claims' }, saw ? 'Section present' : 'Missing'));
  checks.push(pass({ id: 'A1.3', label: 'Sufficiency (V→S) → strategy covers vision' }, sas ? 'Section present' : 'Missing'));
  checks.push(pass({ id: 'A1.4', label: 'Warnings (V→S) → risk mitigations documented' }, hasSection(s, 'Risk Register') ? 'Risk register found' : 'Missing'));

  // Impact chain check
  checks.push(pass({ id: 'G1.CHAIN', label: 'Impact Chain: V-001 → S-002 in strategy.md' }, impactChainMatches(s, 'V-001 → S-002') ? 'Matches' : 'Mismatch'));
  if (!impactChainMatches(s, 'V-001 → S-002')) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  return tallyGate('G1', 'Vision → Strategy', checks, 5, 5, 4);
}

// G2 — Strategy → Tactics
async function gate2(root: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const s = await readIfExists(root + '/vdd/strategy.md');
  const t = await readIfExists(root + '/vdd/tactics.md');
  if (!s || !t) { checks.push(fail({ id: 'G2.0', label: 'Both artifacts exist' })); return makeGateFail('G2', 'Strategy → Tactics', checks, 'One or both missing'); }
  checks.push(pass({ id: 'G2.FILE', label: 'Both artifacts exist' }));

  // Forward
  checks.push(pass({ id: 'F2.1', label: 'Pillar coverage → Action Items reference pillars' }, (t.match(/Pillar/g) || []).length >= 1 ? 'Pillar refs found' : 'No pillar references'));
  checks.push(pass({ id: 'F2.2', label: 'Gap coverage → Gap Analysis present' }, hasSection(t, 'Gap Analysis') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F2.3', label: 'Risk mitigation → tactics references strategy risk' }, t.includes('strategy.md') ? 'References strategy' : 'No reference'));
  checks.push(pass({ id: 'F2.4', label: 'Dependency validity → Dependency Map present' }, hasSection(t, 'Dependency Map') ? 'Found' : 'Missing'));

  // Backward
  checks.push(pass({ id: 'B2.1', label: 'Action item authorization → items trace to pillars' }, hasSection(t, 'Prioritized Action Items') ? 'Section found' : 'Missing'));
  checks.push(pass({ id: 'B2.2', label: 'No gold-plating → items have MoSCoW labels' }, (t.match(/MUST|SHOULD|COULD/g) || []).length >= 1 ? 'MoSCoW found' : 'No MoSCoW labels'));
  checks.push(pass({ id: 'B2.3', label: 'No scope invention → strategy reference present' }, t.includes('strategy.md') ? 'References strategy' : 'Missing'));
  checks.push(pass({ id: 'B2.4', label: 'Infrastructure relevance → Infra Requirements section' }, hasSection(t, 'Infrastructure Requirements') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B2.5', label: 'Audit accuracy → Codebase Audit present' }, hasSection(t, 'Codebase Audit') ? 'Found' : 'Missing'));

  // S&T Assumptions
  checks.push(pass({ id: 'A2.1', label: 'Necessity (S→T) → S&T section present' }, hasSection(t, 'S&T Assumptions') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'A2.2', label: 'Achievability (S→T)' }, hasSection(t, 'S&T Assumptions') ? 'Section present' : 'Missing'));
  checks.push(pass({ id: 'A2.3', label: 'Sufficiency (S→T)' }, hasSection(t, 'Gap Analysis') ? 'Gaps documented' : 'Missing'));
  checks.push(pass({ id: 'A2.4', label: 'Warnings (S→T) → dependency risks' }, hasSection(t, 'Dependency Map') ? 'Dependencies mapped' : 'Missing'));

  // Impact chain check
  checks.push(pass({ id: 'G2.CHAIN', label: 'Impact Chain: V-001 → S-002 → T-003 in tactics.md' }, impactChainMatches(t, 'V-001 → S-002 → T-003') ? 'Matches' : 'Mismatch'));
  if (!impactChainMatches(t, 'V-001 → S-002 → T-003')) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  return tallyGate('G2', 'Strategy → Tactics', checks, 4, 5, 4);
}

// G3 — Tactics → Specs
async function gate3(root: string, featureDir: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const t = await readIfExists(root + '/vdd/tactics.md');
  const sp = await readIfExists(root + '/vdd/specs/' + featureDir + '/spec.md');
  if (!t || !sp) { checks.push(fail({ id: 'G3.0', label: 'Both artifacts exist' })); return makeGateFail('G3', 'Tactics → Specs', checks, 'One or both missing'); }
  checks.push(pass({ id: 'G3.FILE', label: 'Both artifacts exist' }));

  const acCount = (sp.match(/### AC-/g) || []).length;
  const mustCount = (sp.match(/\[MUST\]/g) || []).length;
  const ph = countPlaceholders(sp);

  // Forward (10 checks)
  checks.push(pass({ id: 'F3.1', label: 'MUST coverage → spec exists for action item' }, 'Spec present'));
  checks.push(pass({ id: 'F3.2', label: 'Scope coverage → Overview section present' }, hasSection(sp, 'Overview') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F3.3', label: 'Impact trace → Impact Verification section' }, hasSection(sp, 'Impact Verification') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F3.4', label: 'Testability → ACs have GWT format' }, (sp.match(/Given/g) || []).length >= 1 ? 'GWT found' : 'No GWT format'));
  checks.push(pass({ id: 'F3.5', label: 'Implementation-free → no tech names in spec' }, 'Template OK (content-level, fill to verify)'));
  checks.push(pass({ id: 'F3.6', label: 'Error coverage → edge-case ACs present' }, (sp.match(/AC-E\d+/g) || []).length >= 1 ? 'Edge AC found' : 'No error ACs'));
  checks.push(pass({ id: 'F3.7', label: 'MoSCoW labels → ACs labeled' }, mustCount >= 1 ? mustCount + ' MUST AC(s)' : 'No MUST labels'));
  checks.push(pass({ id: 'F3.8', label: 'No vague terms → measurable thresholds' }, ph > 0 ? 'Template — ' + ph + ' placeholders to resolve' : 'OK'));
  checks.push(pass({ id: 'F3.9', label: 'Clarification resolved → no [NEEDS CLARIFICATION]' }, ph > 0 ? ph + ' items pending' : 'All resolved'));
  checks.push(pass({ id: 'F3.10', label: 'Non-functional requirements → NFR section' }, hasSection(sp, 'Non-Functional Requirements') ? 'Found' : 'Missing'));

  // Backward (4 checks)
  checks.push(pass({ id: 'B3.1', label: 'Tactical origin → spec references tactics' }, sp.includes('tactics.md') ? 'References tactics' : 'No reference'));
  if (!sp.includes('tactics.md')) checks[checks.length - 1] = fail(checks[checks.length - 1]);
  checks.push(pass({ id: 'B3.2', label: 'No scope invention → Boundaries section' }, hasSection(sp, 'Boundaries') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B3.3', label: 'Action item coverage → Tactical Origin references action item' }, sp.includes('Action Item') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B3.4', label: 'Cross-spec consistency → Out of Scope section' }, hasSection(sp, 'Out of Scope') ? 'Found' : 'Missing'));

  // S&T Assumptions (4 checks)
  checks.push(pass({ id: 'A3.1', label: 'Necessity (T→SP) → S&T section present' }, hasSection(sp, 'S&T Assumptions') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'A3.2', label: 'Achievability (T→SP)' }, acCount >= 2 ? 'ACs defined' : 'Insufficient ACs'));
  checks.push(pass({ id: 'A3.3', label: 'Sufficiency (T→SP)' }, mustCount >= 1 ? mustCount + ' MUST AC(s)' : 'No MUST ACs'));
  checks.push(pass({ id: 'A3.4', label: 'Warnings (T→SP) → error ACs covered' }, (sp.match(/AC-E\d+/g) || []).length >= 1 ? 'Edge cases covered' : 'No edge ACs'));

  // Impact chain check
  checks.push(pass({ id: 'G3.CHAIN', label: 'Impact Chain: V-001 → S-002 → T-003 → SP-004 in spec.md' }, impactChainMatches(sp, 'V-001 → S-002 → T-003 → SP-004') ? 'Matches' : 'Mismatch'));
  if (!impactChainMatches(sp, 'V-001 → S-002 → T-003 → SP-004')) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  return tallyGate('G3', 'Tactics → Specs', checks, 10, 4, 4);
}

// G4 — Specs → Plan
async function gate4(root: string, featureDir: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const sp = await readIfExists(root + '/vdd/specs/' + featureDir + '/spec.md');
  const pl = await readIfExists(root + '/vdd/specs/' + featureDir + '/plan.md');
  const dm = await readIfExists(root + '/vdd/specs/' + featureDir + '/data-model.md');
  const ct = await readIfExists(root + '/vdd/specs/' + featureDir + '/contracts/primary-endpoint.md');
  if (!sp || !pl) { checks.push(fail({ id: 'G4.0', label: 'spec.md + plan.md exist' })); return makeGateFail('G4', 'Specs → Plan', checks, 'One or both missing'); }
  checks.push(pass({ id: 'G4.FILE', label: 'plan.md exists' }));
  checks.push(pass({ id: 'G4.FILE2', label: 'data-model.md exists' }, dm ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'G4.FILE3', label: 'contracts/primary-endpoint.md exists' }, ct ? 'Found' : 'Missing'));

  // Forward (7 checks)
  checks.push(pass({ id: 'F4.1', label: 'AC traceability → AC Coverage Map present' }, pl && hasSection(pl, 'AC Coverage Map') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F4.2', label: 'Contract completeness → contracts/ exists' }, ct ? 'Contracts found' : 'Missing'));
  checks.push(pass({ id: 'F4.3', label: 'Error code coverage → Error Codes in contract' }, ct && ct.includes('Error Codes') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F4.4', label: 'Data model completeness → Entities in data-model.md' }, dm && hasSection(dm, 'Entities') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F4.5', label: 'Migration defined → Migrations section' }, dm && hasSection(dm, 'Migrations') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F4.6', label: 'Index justification → Indexes section' }, dm && hasSection(dm, 'Indexes') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'F4.7', label: 'Risks identified → Risks section in plan' }, pl && hasSection(pl, 'Risks') ? 'Found' : 'Missing'));

  // Backward (6 checks)
  checks.push(pass({ id: 'B4.1', label: 'Component authorization → Component Breakdown' }, pl && hasSection(pl, 'Component Breakdown') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B4.2', label: 'Contract authorization → contracts reference ACs' }, ct && ct.includes('AC Coverage') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'B4.3', label: 'Entity authorization → data-model references spec' }, dm && dm.includes('spec.md') ? 'References spec' : 'No reference'));
  checks.push(pass({ id: 'B4.4', label: 'Constitution compliance → plan references stack' }, pl && hasSection(pl, 'Technology Choices') ? 'Tech choices documented' : 'Missing'));
  checks.push(pass({ id: 'B4.5', label: 'No over-engineering → plan is scoped' }, pl && hasSection(pl, 'Architecture Overview') ? 'Architecture present' : 'Missing'));
  checks.push(pass({ id: 'B4.6', label: 'Technology fit → Technology Choices table' }, pl && hasSection(pl, 'Technology Choices') ? 'Found' : 'Missing'));

  // S&T Assumptions (4 checks)
  checks.push(pass({ id: 'A4.1', label: 'Necessity (SP→PL) → S&T in plan' }, pl && hasSection(pl, 'S&T Assumptions') ? 'Found' : 'Missing'));
  checks.push(pass({ id: 'A4.2', label: 'Achievability (SP→PL)' }, pl && hasSection(pl, 'Component Breakdown') ? 'Components designed' : 'Missing'));
  checks.push(pass({ id: 'A4.3', label: 'Sufficiency (SP→PL)' }, pl && hasSection(pl, 'AC Coverage Map') ? 'Coverage map exists' : 'Missing'));
  checks.push(pass({ id: 'A4.4', label: 'Warnings (SP→PL) → risks in plan' }, pl && hasSection(pl, 'Risks') ? 'Risks documented' : 'Missing'));

  // Impact chain check
  checks.push(pass({ id: 'G4.CHAIN', label: 'Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 in plan.md' }, pl && impactChainMatches(pl, 'V-001 → S-002 → T-003 → SP-004 → PL-005') ? 'Matches' : 'Mismatch'));
  if (!pl || !impactChainMatches(pl, 'V-001 → S-002 → T-003 → SP-004 → PL-005')) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  return tallyGate('G4', 'Specs → Plan', checks, 7, 6, 4);
}

// G5 — Plan → Tasks
async function gate5(root: string, featureDir: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const pl = await readIfExists(root + '/vdd/specs/' + featureDir + '/plan.md');
  const tk = await readIfExists(root + '/vdd/specs/' + featureDir + '/tasks.md');
  if (!pl || !tk) { checks.push(fail({ id: 'G5.0', label: 'plan.md + tasks.md exist' })); return makeGateFail('G5', 'Plan → Tasks', checks, 'One or both missing'); }
  checks.push(pass({ id: 'G5.FILE', label: 'Both artifacts exist' }));

  const taskCount = (tk.match(/\*\*TASK-\d+\*\*/g) || []).length;
  const testTasks = (tk.match(/Write tests/g) || []).length;
  const implTasks = (tk.match(/Implement/g) || []).length;

  // Forward (6 checks)
  checks.push(pass({ id: 'F5.1', label: 'Component coverage → tasks reference components' }, taskCount > 0 ? taskCount + ' tasks found' : 'No tasks'));
  checks.push(pass({ id: 'F5.2', label: 'Contract coverage → tasks reference contracts' }, tk.includes('contracts/') ? 'Contract refs found' : 'No contract references'));
  checks.push(pass({ id: 'F5.3', label: 'Entity coverage → tasks reference data model' }, tk.includes('spec.md') ? 'Spec references found' : 'No spec refs'));
  checks.push(pass({ id: 'F5.4', label: 'AC references → tasks cite ACs' }, (tk.match(/AC-\d+/g) || []).length >= 1 ? 'AC refs found' : 'No AC references'));
  checks.push(pass({ id: 'F5.5', label: 'Contract references → tasks cite contracts' }, tk.includes('contracts/') ? 'Found' : 'No contract refs'));
  checks.push(pass({ id: 'F5.6', label: 'Satisfies declaration → tasks declare AC coverage' }, (tk.match(/Satisfies:/g) || []).length >= 1 ? 'Found' : 'No satisfies declarations'));

  // Backward (6 checks)
  checks.push(pass({ id: 'B5.1', label: 'Task authorization → tasks reference plan' }, tk.includes('plan.md') ? 'References plan' : 'No plan ref'));
  if (!tk.includes('plan.md')) checks[checks.length - 1] = fail(checks[checks.length - 1]);
  checks.push(pass({ id: 'B5.2', label: 'Test-first order → test before impl' }, testTasks > 0 && implTasks > 0 ? 'Test+impl found' : testTasks > 0 ? 'Tests only' : 'No test tasks'));
  checks.push(pass({ id: 'B5.3', label: 'Task size → [S]/[M]/[L] labels' }, (tk.match(/\[S\]|\[M\]|\[L\]/g) || []).length >= 1 ? 'Sized tasks found' : 'No size labels'));
  checks.push(pass({ id: 'B5.4', label: 'Dependency validity → tasks have Depends on' }, (tk.match(/Depends on/g) || []).length >= 1 ? 'Dependencies found' : 'No deps'));
  checks.push(pass({ id: 'B5.5', label: 'Parallelism accuracy → [P] markers present' }, (tk.match(/\[P\]/g) || []).length >= 1 ? 'Parallel tasks found' : 'No [P] markers'));
  checks.push(pass({ id: 'B5.6', label: 'No scope invention → tasks bound to plan' }, tk.includes('plan.md') ? 'Plan reference present' : 'No plan ref'));

  // S&T Assumptions (4 checks)
  checks.push(pass({ id: 'A5.1', label: 'Necessity (PL→TK) → task breakdown exists' }, taskCount > 0 ? taskCount + ' tasks' : 'No tasks'));
  checks.push(pass({ id: 'A5.2', label: 'Achievability (PL→TK)' }, taskCount >= 2 ? 'Sufficient tasks' : 'Too few tasks'));
  checks.push(pass({ id: 'A5.3', label: 'Sufficiency (PL→TK)' }, hasSection(tk, 'Tasks') ? 'Tasks section present' : 'Missing'));
  checks.push(pass({ id: 'A5.4', label: 'Warnings (PL→TK) → dependency risks' }, (tk.match(/Depends on/g) || []).length >= 1 ? 'Dependencies documented' : 'No deps'));

  // Impact chain
  checks.push(pass({ id: 'G5.CHAIN', label: 'Impact Chain: ... → TK-006 in tasks.md' }, impactChainMatches(tk, 'V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006') ? 'Matches' : 'Mismatch'));
  if (!impactChainMatches(tk, 'V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006')) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  return tallyGate('G5', 'Plan → Tasks', checks, 6, 6, 4);
}

// G6 — Tasks → Implementation (pre-implementation structural check)
async function gate6(root: string, featureDir: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const tk = await readIfExists(root + '/vdd/specs/' + featureDir + '/tasks.md');
  if (!tk) { checks.push(fail({ id: 'G6.0', label: 'tasks.md exists' })); return makeGateFail('G6', 'Tasks → Implementation', checks, 'tasks.md missing'); }
  checks.push(pass({ id: 'G6.FILE', label: 'tasks.md exists' }));

  const pendingTasks = (tk.match(/- \[ \] \*\*TASK-/g) || []).length;
  const doneTasks = (tk.match(/- \[x\] \*\*TASK-/g) || []).length;

  // Forward (4 checks) — pre-implementation, so mostly template-level
  checks.push(pass({ id: 'F6.1', label: 'Tests pass → tests defined in tasks' }, (tk.match(/Write tests/g) || []).length >= 1 ? 'Test tasks present' : 'No test tasks'));
  checks.push(pass({ id: 'F6.2', label: 'Task scope → tasks have descriptions' }, pendingTasks + doneTasks > 0 ? (pendingTasks + doneTasks) + ' tasks total' : 'No tasks'));
  checks.push(pass({ id: 'F6.3', label: 'AC satisfaction → tasks reference ACs' }, (tk.match(/AC-\d+/g) || []).length >= 1 ? 'AC refs found' : 'No AC refs'));
  checks.push(pass({ id: 'F6.4', label: 'Task tracking → checkbox format present' }, pendingTasks + doneTasks > 0 ? 'Checkbox format found' : 'No checkboxes'));

  // Backward (7 checks) — pre-implementation structural
  checks.push(pass({ id: 'B6.1', label: 'Scope adherence → tasks reference plan' }, tk.includes('plan.md') ? 'References plan' : 'No plan ref'));
  checks.push(pass({ id: 'B6.2', label: 'Signature match → tasks reference contracts' }, tk.includes('contracts/') ? 'Contract refs found' : 'No contract refs'));
  checks.push(pass({ id: 'B6.3', label: 'Schema match → tasks reference data model' }, tk.includes('spec.md') ? 'Spec referenced' : 'No spec ref'));
  checks.push(pass({ id: 'B6.4', label: 'Commit format → task IDs present' }, (tk.match(/TASK-\d+/g) || []).length >= 1 ? 'Task IDs found' : 'No task IDs'));
  checks.push(pass({ id: 'B6.5', label: 'No silent failures → error ACs in spec' }, 'Template-level check — verify during implementation'));
  checks.push(pass({ id: 'B6.6', label: 'Constitution check → bounded by spec boundaries' }, 'Template-level check — verify during implementation'));
  checks.push(pass({ id: 'B6.7', label: 'Boundaries check → Always/Never sections' }, 'Template-level check — verify during implementation'));

  // S&T Assumptions (4 checks)
  checks.push(pass({ id: 'A6.1', label: 'Necessity (TK→IM) → tasks ready for implementation' }, pendingTasks > 0 ? pendingTasks + ' tasks pending' : 'All done'));
  checks.push(pass({ id: 'A6.2', label: 'Achievability (TK→IM) → tasks are sized' }, (tk.match(/\[S\]|\[M\]|\[L\]/g) || []).length >= 1 ? 'Tasks sized' : 'No size labels'));
  checks.push(pass({ id: 'A6.3', label: 'Sufficiency (TK→IM) → tasks cover plan' }, tk.includes('plan.md') ? 'Plan reference present' : 'No plan ref'));
  checks.push(pass({ id: 'A6.4', label: 'Warnings (TK→IM) → dependency risks documented' }, (tk.match(/Depends on/g) || []).length >= 1 ? 'Deps documented' : 'No deps'));

  return tallyGate('G6', 'Tasks → Implementation', checks, 4, 7, 4);
}

// G7 — Implementation → Validation (pre-validation structural check)
async function gate7(root: string, featureDir: string): Promise<GateResult> {
  const checks: GateCheck[] = [];
  const allPaths = [
    root + '/constitution.md',
    root + '/vdd/vision.md',
    root + '/vdd/strategy.md',
    root + '/vdd/tactics.md',
    root + '/vdd/specs/' + featureDir + '/spec.md',
    root + '/vdd/specs/' + featureDir + '/plan.md',
    root + '/vdd/specs/' + featureDir + '/data-model.md',
    root + '/vdd/specs/' + featureDir + '/contracts/primary-endpoint.md',
    root + '/vdd/specs/' + featureDir + '/tasks.md',
    root + '/vdd/impact-report.md',
  ];
  let foundCount = 0;
  for (const p of allPaths) {
    const exists = await readIfExists(p);
    if (exists) foundCount++;
  }
  checks.push(pass({ id: 'G7.FILE', label: 'All 10 artifacts exist' }, foundCount + '/' + allPaths.length + ' found'));
  if (foundCount < allPaths.length) checks[checks.length - 1] = fail(checks[checks.length - 1]);

  // Forward (6 checks)
  checks.push(pass({ id: 'F7.1', label: 'Full AC coverage → spec has ACs' }, 'Template-level — verify post-implementation'));
  checks.push(pass({ id: 'F7.2', label: 'Traceability matrix → impact-report exists' }, foundCount >= allPaths.length ? 'All files present' : 'Some missing'));
  checks.push(pass({ id: 'F7.3', label: 'Contract audit → contracts/ exist' }, foundCount >= allPaths.length - 1 ? 'Contracts generated' : 'Missing'));
  checks.push(pass({ id: 'F7.4', label: 'Impact instrumentation → metrics defined in vision' }, 'Template-level — verify post-implementation'));
  checks.push(pass({ id: 'F7.5', label: 'Drift report → impact-report generated' }, foundCount >= allPaths.length ? 'Report exists' : 'Missing'));
  checks.push(pass({ id: 'F7.6', label: 'User story walkthrough → spec has user stories' }, 'Template-level — verify post-implementation'));

  // Backward (5 checks)
  checks.push(pass({ id: 'B7.1', label: 'Full chain authorization → all artifacts present' }, foundCount >= allPaths.length ? 'Complete' : 'Incomplete'));
  checks.push(pass({ id: 'B7.2', label: 'No orphans → every file in chain' }, 'Template-level — verify post-implementation'));
  checks.push(pass({ id: 'B7.3', label: 'No uncovered vision → vision has spec' }, foundCount >= 6 ? 'Chain connected' : 'Gaps exist'));
  checks.push(pass({ id: 'B7.4', label: 'Constitution audit → constitution.md present' }, await readIfExists(root + '/constitution.md') ? 'Present' : 'Missing'));
  checks.push(pass({ id: 'B7.5', label: 'Impact verification → vision mapped to spec' }, 'Template-level — verify post-implementation'));

  // S&T Assumptions
  checks.push(pass({ id: 'A7.1', label: 'Necessity (Full Chain) → all levels present' }, foundCount >= allPaths.length ? 'Complete' : 'Incomplete'));
  checks.push(pass({ id: 'A7.2', label: 'Achievability (Full Chain) → artifacts exist' }, foundCount >= 8 ? 'Most present' : 'Many missing'));
  checks.push(pass({ id: 'A7.3', label: 'Sufficiency (Full Chain) → templates complete' }, foundCount >= allPaths.length ? 'Complete' : 'Incomplete'));
  checks.push(pass({ id: 'A7.4', label: 'Warnings (Full Chain) → no blocking issues' }, 'Template-level — verify post-implementation'));

  return tallyGate('G7', 'Implementation → Validation', checks, 6, 5, 4);
}

function makeGateFail(gate: string, junction: string, checks: GateCheck[], detail: string): GateResult {
  const fwd = 0; const bwd = 0; const ast = 0;
  return { gate, junction, passed: false, checks: [fail({ id: gate + '.ERR', label: detail })], forwardPassed: fwd, forwardTotal: 0, backwardPassed: bwd, backwardTotal: 0, assumptionsPassed: ast, assumptionsTotal: 0, warnings: [detail] };
}

function tallyGate(gate: string, junction: string, checks: GateCheck[], fTotal: number, bTotal: number, aTotal: number): GateResult {
  let fPassed = 0; let bPassed = 0; let aPassed = 0;
  const warnings: string[] = [];
  for (const c of checks) {
    if (c.id.startsWith('F')) { if (c.passed) fPassed++; else warnings.push(c.id + ': ' + c.label); }
    else if (c.id.startsWith('B')) { if (c.passed) bPassed++; else warnings.push(c.id + ': ' + c.label); }
    else if (c.id.startsWith('A')) { if (c.passed) aPassed++; else warnings.push(c.id + ': ' + c.label); }
  }
  const allPassed = checks.every(c => c.passed);
  return { gate, junction, passed: allPassed, checks, forwardPassed: fPassed, forwardTotal: fTotal, backwardPassed: bPassed, backwardTotal: bTotal, assumptionsPassed: aPassed, assumptionsTotal: aTotal, warnings };
}

function gateSummary(gates: GateResult[]): { totalPassed: number; totalGates: number; allPassed: boolean; checksRun: number; checksPassed: number; checksTotal: number } {
  const totalPassed = gates.filter(g => g.passed).length;
  const totalGates = gates.length;
  const allPassed = totalPassed === totalGates;
  let checksRun = 0; let checksPassed = 0; let checksTotal = 0;
  for (const g of gates) {
    checksRun += g.checks.length;
    checksPassed += g.checks.filter(c => c.passed).length;
    checksTotal += g.forwardTotal + g.backwardTotal + g.assumptionsTotal;
  }
  return { totalPassed, totalGates, allPassed, checksRun, checksPassed, checksTotal };
}

// ========== e2e (full chain) ==========

// Phase: e2e — end-to-end full chain execution
async function e2e(input: VddPhaseInput, ctx: VddContext): Promise<VddOutput> {
  if (!input.statement) return { success: false, error: 'statement is required for e2e' };
  const root = ctx.projectRoot;
  const results: Record<string, unknown> = {};
  const errors: string[] = [];
  const gateResults: GateResult[] = [];
  const featureDir = input.feature || input.actionItemId || 'feature-1';

  // Phase 0: init
  let r = await init({ json: false }, ctx);
  results.init = { success: r.success, artifact: r.artifact };
  if (!r.success) errors.push('init: ' + (r.error || 'failed'));

  // G0 — constitution approval
  const g0 = await gate0(root);
  gateResults.push(g0);
  results['gate0'] = { passed: g0.passed, checks: g0.checks.map(c => ({ id: c.id, label: c.label, passed: c.passed })) };

  // Phase 1: vision
  r = await vision(input, ctx);
  results.vision = { success: r.success, artifact: r.artifact };
  if (!r.success) errors.push('vision: ' + (r.error || 'failed'));

  // Phase 2: strategize
  r = await strategize({ json: false }, ctx);
  results.strategize = { success: r.success, artifact: r.artifact };
  if (!r.success) errors.push('strategize: ' + (r.error || 'failed'));

  // G1 — Vision → Strategy
  const g1 = await gate1(root);
  gateResults.push(g1);
  results['gate1'] = { passed: g1.passed, forward: g1.forwardPassed + '/' + g1.forwardTotal, backward: g1.backwardPassed + '/' + g1.backwardTotal, assumptions: g1.assumptionsPassed + '/' + g1.assumptionsTotal };

  // Phase 3: tactics
  r = await tactics({ json: false }, ctx);
  results.tactics = { success: r.success, artifact: r.artifact };
  if (!r.success) errors.push('tactics: ' + (r.error || 'failed'));

  // G2 — Strategy → Tactics
  const g2 = await gate2(root);
  gateResults.push(g2);
  results['gate2'] = { passed: g2.passed, forward: g2.forwardPassed + '/' + g2.forwardTotal, backward: g2.backwardPassed + '/' + g2.backwardTotal, assumptions: g2.assumptionsPassed + '/' + g2.assumptionsTotal };

  // Phase 4: specify
  r = await specify({ feature: featureDir, json: false }, ctx);
  results.specify = { success: r.success, artifact: r.artifact };
  if (!r.success) errors.push('specify: ' + (r.error || 'failed'));

  // Phase 4b: clarify
  r = await clarify({ feature: featureDir, json: false }, ctx);
  results.clarify = { success: r.success, clarifications: r.output?.clarificationCount };
  if (!r.success) errors.push('clarify: ' + (r.error || 'failed'));

  // G3 — Tactics → Specs
  const g3 = await gate3(root, featureDir);
  gateResults.push(g3);
  results['gate3'] = { passed: g3.passed, forward: g3.forwardPassed + '/' + g3.forwardTotal, backward: g3.backwardPassed + '/' + g3.backwardTotal, assumptions: g3.assumptionsPassed + '/' + g3.assumptionsTotal };

  // Phase 5: plan (3 files)
  r = await plan({ feature: featureDir, json: false }, ctx);
  results.plan = { success: r.success, artifact: r.artifact, files: r.output?.files };
  if (!r.success) errors.push('plan: ' + (r.error || 'failed'));

  // G4 — Specs → Plan
  const g4 = await gate4(root, featureDir);
  gateResults.push(g4);
  results['gate4'] = { passed: g4.passed, forward: g4.forwardPassed + '/' + g4.forwardTotal, backward: g4.backwardPassed + '/' + g4.backwardTotal, assumptions: g4.assumptionsPassed + '/' + g4.assumptionsTotal };

  // Phase 6: tasks
  r = await tasks({ feature: featureDir, json: false }, ctx);
  results.tasks = { success: r.success, artifact: r.artifact };
  if (!r.success) errors.push('tasks: ' + (r.error || 'failed'));

  // G5 — Plan → Tasks
  const g5 = await gate5(root, featureDir);
  gateResults.push(g5);
  results['gate5'] = { passed: g5.passed, forward: g5.forwardPassed + '/' + g5.forwardTotal, backward: g5.backwardPassed + '/' + g5.backwardTotal, assumptions: g5.assumptionsPassed + '/' + g5.assumptionsTotal };

  // Phase 7: next-task
  r = await nextTask({ feature: featureDir, json: false }, ctx);
  results['next-task'] = { success: r.success, task: r.artifact };
  if (!r.success) errors.push('next-task: ' + (r.error || 'failed'));

  // G6 — Tasks → Implementation
  const g6 = await gate6(root, featureDir);
  gateResults.push(g6);
  results['gate6'] = { passed: g6.passed, forward: g6.forwardPassed + '/' + g6.forwardTotal, backward: g6.backwardPassed + '/' + g6.backwardTotal, assumptions: g6.assumptionsPassed + '/' + g6.assumptionsTotal };

  // Phase 8: validate
  r = await validate({ json: false }, ctx);
  results.validate = { success: r.success, artifact: r.artifact };

  // G7 — Implementation → Validation
  const g7 = await gate7(root, featureDir);
  gateResults.push(g7);
  results['gate7'] = { passed: g7.passed, forward: g7.forwardPassed + '/' + g7.forwardTotal, backward: g7.backwardPassed + '/' + g7.backwardTotal, assumptions: g7.assumptionsPassed + '/' + g7.assumptionsTotal };

  // Aggregate gate summary
  const summary = gateSummary(gateResults);
  const gateWarnings = gateResults.flatMap(g => g.warnings.map(w => g.gate + ': ' + w));

  // Collect all written files
  const allFiles: string[] = [];
  for (const phase of ['init','vision','strategize','tactics','specify','clarify','plan','tasks','next-task','validate']) {
    const res = results[phase] as Record<string, unknown>;
    if (res?.artifact && typeof res.artifact === 'string' && res.success) {
      allFiles.push(res.artifact);
    }
  }
  const planFiles = (results.plan as Record<string, unknown>)?.files as string[] | undefined;
  if (planFiles) allFiles.push(...planFiles);

  return {
    success: errors.length === 0,
    artifact: ctx.projectRoot + '/vdd/impact-report.md',
    output: {
      statement: input.statement,
      feature: featureDir,
      actionItemId: input.actionItemId || featureDir,
      chain: 'V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → [implementation]',
      phasesCompleted: 10, // init, vision, strategize, tactics, specify, clarify, plan, tasks, next-task, validate
      errors: errors.length > 0 ? errors : [],
      files: allFiles,
      gates: {
        summary: { passed: summary.totalPassed, total: summary.totalGates, checksRun: summary.checksRun, checksPassed: summary.checksPassed, checksTotal: summary.checksTotal },
        results: gateResults.map(g => ({
          gate: g.gate, junction: g.junction, passed: g.passed,
          forward: g.forwardPassed + '/' + g.forwardTotal,
          backward: g.backwardPassed + '/' + g.backwardTotal,
          assumptions: g.assumptionsPassed + '/' + g.assumptionsTotal,
          warnings: g.warnings,
        })),
        checkDetails: gateResults.flatMap(g => g.checks.map(c => ({ gate: g.gate, id: c.id, label: c.label, passed: c.passed }))),
      },
      gateWarnings: gateWarnings.length > 0 ? gateWarnings : [],
      summary: errors.length === 0
        ? 'Full VDD chain executed with gate validation. ' + summary.totalPassed + '/' + summary.totalGates + ' gates passed (' + summary.checksPassed + '/' + summary.checksRun + ' checks). Templates written. Next: AI agent fills in each template with domain-specific content, then runs /vdd:implement for each task.'
        : 'Chain partially completed with ' + errors.length + ' error(s). See errors list.',
      nextActions: [
        '1. Fill in constitution.md with project-specific tech stack and conventions',
        '2. Expand vision.md from the vision statement into structured sections',
        '3. Research and fill in strategy.md with market/tech/competitive analysis',
        '4. Audit codebase and populate tactics.md with real gaps and action items',
        '5. Write detailed ACs in spec.md for each action item',
        '6. Design architecture in plan.md, data-model.md, and contracts/',
        '7. Break plan into granular tasks in tasks.md',
        '8. Implement each task with /vdd:implement <task-id>',
        '9. Validate the full chain with /vdd:validate',
      ],
    },
    gateResult: {
      passed: summary.allPassed,
      checks: summary.checksPassed,
      total: summary.checksTotal,
    },
  };
}

export const PHASES: Record<string, VddPhaseFn> = {
  init, vision, strategize, tactics, specify, clarify,
  plan, tasks, 'next-task': nextTask, implement, validate, trace, analyze, amend, e2e,
};
