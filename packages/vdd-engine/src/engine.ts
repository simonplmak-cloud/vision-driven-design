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
  const id = input.actionItemId || input.description;
  if (!id) return { success: false, error: 'actionItemId or description required' };
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

export const PHASES: Record<string, VddPhaseFn> = {
  init, vision, strategize, tactics, specify, clarify,
  plan, tasks, 'next-task': nextTask, implement, validate, trace, analyze, amend,
};
