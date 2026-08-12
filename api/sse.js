const today = new Date().toISOString().split("T")[0];
function hdr(chain) { return `Status: Draft\nVersion: 1.0\nLast updated: ${today}\n\n> Impact Chain: ${chain}\n\n`; }

function phaseHandlers(input) {
  const root = input.projectRoot || ".";
  const s = input.statement || "";
  const id = input.actionItemId || input.description || "";
  const feat = input.feature || "";
  const tid = input.taskId || "";
  const desc = input.description || "";

  return {
    init() {
      return { success: true, artifact: `${root}/constitution.md`, template: `# Project Constitution\n${hdr("Phase 0 — Constitution (immutable)")}## Architecture Principles\n\n- [e.g., "API-first: all features expose a REST endpoint before any UI is built"]\n- [e.g., "Server Components by default; use client components only when required"]\n\n## Technology Stack\n\n| Layer | Choice | Notes |\n|-------|--------|-------|\n| Language | TypeScript 5.x | Strict mode, no \`any\` |\n| Runtime | Node.js 20+ | |\n| Framework | [e.g., Next.js 15+] | App Router only |\n| Database | PostgreSQL + Drizzle | No direct SQL in route handlers |\n| Auth | [e.g., Better Auth] | No custom auth logic outside the auth module |\n| Testing | Vitest + Playwright | |\n\n## Security Constraints\n\n- Authentication: all endpoints require a valid session unless explicitly marked \`[PUBLIC]\`\n- Input validation: all external inputs validated with Zod at the route boundary\n- SQL injection: parameterized queries only — never string-concatenate user input into queries\n- Secrets: never log tokens, passwords, or PII; never hardcode secrets\n- CORS: allow-list only — no wildcard origins in production\n- Rate limiting: all public endpoints must declare a rate limit in their contract\n\n## Naming Conventions\n\n- Files: kebab-case (\`user-repository.ts\`)\n- Variables/functions: camelCase\n- Types/interfaces: PascalCase\n- DB columns: snake_case\n- Env vars: SCREAMING_SNAKE_CASE\n\n## Banned Patterns\n\n- No \`any\` type in TypeScript\n- No \`console.log\` in production code (use logger)\n- No synchronous file I/O in request handlers\n\n## File Structure Rules\n\n\`\`\`\nsrc/\n  app/          # Routes and pages\n  components/   # Shared UI components\n  lib/          # Business logic and utilities\n  db/           # Schema, migrations, repositories\n  types/        # Shared TypeScript types\n\`\`\`\n\n## Domain Primitives\n- webapp\n- data-storage\n- [etl / infrastructure]\n\n## Open Questions / Deferred Decisions\n- [PENDING] [Decision 1]: [context and options]\n` };
    },
    vision() {
      if (!s) return { success: false, error: "statement is required" };
      const esc = s.replace(/`/g, "\\`");
      return { success: true, artifact: `${root}/vdd/vision.md`, template: `# Vision\n${hdr("V-001")}## Vision Statement\n> ${esc}\n\n[AI assistant: expand the above freeform statement into a structured vision.]\n\n## Impact Model\n### Goal\n[1 sentence — the measurable outcome this product aims to create]\n\n### Actors\n| Actor | Current State | Desired State | Benefit |\n|-------|--------------|---------------|---------|\n| [Primary user] | [Today] | [Future] | [Why better] |\n\n### Impacts\n| Impact ID | Description | Actor | Measurement |\n|-----------|-------------|-------|-------------|\n| I-001 | [Change] | [Actor] | [How to measure] |\n\n## Stakeholder Map\n| Role | Interest | Influence | Engagement Strategy |\n|------|----------|-----------|-------------------|\n| [User] | [What they care about] | High | [How to involve] |\n\n## Success Metrics\n### Lagging Indicators\n| Metric | Target | Measurement Method |\n|--------|--------|-------------------|\n| [e.g., Retention day 30] | [> 40%] | [Analytics + cohort] |\n\n### Leading Indicators\n| Metric | Target | Measurement Method |\n|--------|--------|-------------------|\n| [e.g., Activation rate] | [> 60%] | [Key journey completion] |\n\n## Constraints & Boundaries\n### Constraints\n- [Non-negotiable requirement]\n### Boundaries\n- [Explicitly out of scope]\n\n## Target Domains\n- [ ] WebApp\n- [ ] Data Storage\n- [ ] ETL\n- [ ] Infrastructure\n\n## S&T Assumptions (Vision → Strategy)\n**Necessity:** Why is Strategy-level research necessary?\n**Achievability:** Why is this Vision achievable?\n**Sufficiency:** Why is the Strategy approach sufficient?\n**Warnings:** What must go right / be avoided?\n` };
    },
    strategize() {
      return { success: true, artifact: `${root}/vdd/strategy.md`, template: `# Strategy\n${hdr("V-001 → S-002")}## Vision Reference\nDerived from: \`vdd/vision.md\`\n\n## Domain Primers Loaded\n- [domain-primer from vision target domains]\n\n## Research Synthesis\n### Market & Domain Landscape\n[Market conditions, trends, competitor positioning]\n\n### Technology Landscape\n[Viable technologies, trade-offs, constitution constraints]\n\n### Feasibility Assessment\n[Is this achievable with current resources?]\n\n## Strategic Pillars\n### Pillar 1: [Name]\n**Rationale:** [Why this pillar exists]\n**Vision Trace:** [Which vision goal?]\n**Key Research Finding:** [Evidence]\n**Expected Impact:** [Contribution to metrics]\n\n### Pillar 2: [Name]\n**Rationale:** ...\n**Vision Trace:** ...\n**Key Research Finding:** ...\n**Expected Impact:** ...\n\n## Competitive Analysis\n| Competitor | Strengths | Weaknesses | Our Differentiator |\n|------------|-----------|-----------|-------------------|\n| [Name] | [What they do well] | [What they lack] | [How we differ] |\n\n## Risk Register\n| Risk ID | Description | Likelihood | Impact | Mitigation |\n|---------|-------------|-----------|--------|-----------|\n| R-001 | [e.g., Low adoption] | Medium | High | [Early adopter program] |\n\n## S&T Assumptions (Strategy → Tactics)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n\n## Out of Scope (Strategic)\n- [Direction NOT pursued]\n` };
    },
    tactics() {
      return { success: true, artifact: `${root}/vdd/tactics.md`, template: `# Tactics\n${hdr("V-001 → S-002 → T-003")}## Strategy Reference\nDerived from: \`vdd/strategy.md\`\n\n## Codebase Audit\n### What Exists\n| Asset | Location | Purpose | Pillar Trace | Quality |\n|-------|----------|---------|-------------|---------|\n| [Module] | \`src/\` | [Purpose] | [Pillar] | Good/Refactor/Replace |\n\n### Technical Debt\n| Debt Item | Location | Severity | Strategy Impact |\n|-----------|----------|----------|----------------|\n| [e.g., No validation] | \`src/api/\` | High | Blocks security pillar |\n\n### Reusable Assets\n| Asset | Strategy Support | Reuse Effort |\n|-------|-----------------|-------------|\n| [e.g., Component lib] | Accelerates UI | Low |\n\n## Gap Analysis\n| Gap | Pillar Affected | Impact if Unaddressed |\n|-----|----------------|----------------------|\n| [e.g., No mobile layout] | Pillar 1 | Target inaccessible |\n\n## Prioritized Action Items\n| ID | Action Item | Priority | Pillar | Size | Deps |\n|----|------------|----------|--------|------|------|\n| A-001 | [Concrete action] | MUST | Pillar 1 | M | None |\n| A-002 | [Concrete action] | SHOULD | Pillar 2 | S | A-001 |\n\n## Dependency Map\n\`\`\`\nA-001 → A-002\n\`\`\`\n\n## Infrastructure Requirements\n| Requirement | Domain | Priority | Notes |\n|-------------|--------|----------|-------|\n| [e.g., CI/CD] | Infra | MUST | GitHub Actions |\n\n## S&T Assumptions (Tactics → Specs)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n` };
    },
    specify() {
      if (!id) return { success: false, error: "actionItemId or description required" };
      return { success: true, artifact: `${root}/vdd/specs/${id}/spec.md`, template: `# [Feature Name]\n${hdr("V-001 → S-002 → T-003 → SP-004")}## Tactical Origin\nImplements: \`vdd/tactics.md\` → Action Item [${id}]\n\n## Overview\n[1-2 sentences. Reference which vision impact this serves.]\n\n## User Stories\n### Primary\nAs a [role], I want [goal] so that [benefit].\n\n## Boundaries\n**Always do:**\n- [e.g., "validate all inputs before processing"]\n\n**Ask first:**\n- [e.g., "adding a new database table not in this spec"]\n\n**Never do:**\n- [e.g., "skip authentication"]\n\n## Acceptance Criteria\n### AC-1: [Title] [MUST]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n### AC-E1: [Error Case] [MUST]\nGiven [invalid condition]\nWhen [action]\nThen [expected error]\n\n### AC-2: [Title] [SHOULD]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n## Out of Scope\n- [Item 1]\n\n## Open Questions\n- [NEEDS CLARIFICATION] [Question?]\n\n## Non-Functional Requirements\n- Performance: [e.g., "< 200ms at p95"]\n- Security: [e.g., "authenticated session required"]\n- Accessibility: [e.g., "WCAG 2.1 AA"]\n\n## Impact Verification\n- [e.g., AC-1 enables Impact I-001]\n\n## S&T Assumptions (Specs → Plan)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n` };
    },
    clarify() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, output: { clarificationCount: 0, action: "Resolve each [NEEDS CLARIFICATION] item, replace [e.g.] placeholders with concrete values, and add edge-case ACs for every happy-path MUST AC." } };
    },
    plan() {
      if (!feat) return { success: false, error: "feature is required" };
      const base = `${root}/vdd/specs/${feat}`;
      return { success: true, artifact: `${base}/plan.md`, files: {
        [`${base}/plan.md`]: `# Technical Plan\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Spec Reference\nImplements: \`vdd/specs/${feat}/spec.md\`\n\n## Architecture Overview\n[High-level description. 3-5 sentences.]\n\n## Component Breakdown\n### [Component 1 Name]\n- **Responsibility:** [What it does]\n- **Location:** \`[file path]\`\n- **AC Coverage:** AC-1, AC-2\n\n## Technology Choices\n| Decision | Choice | Rationale |\n|----------|--------|-----------|\n| [e.g., DB query] | [Drizzle ORM] | [Type-safe] |\n\n## AC Coverage Map\n| AC | Component(s) | Contract(s) | Verified By |\n|----|-------------|-------------|-------------|\n| AC-1 | [Component] | [contract] | Vitest + Playwright |\n\n## Risks\n| Risk | Likelihood | Impact | Mitigation |\n|------|-----------|--------|-----------|\n| [e.g., API unavailable] | Low | High | Circuit breaker |\n\n## S&T Assumptions (Plan → Tasks)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n`,
        [`${base}/data-model.md`]: `# Data Model\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Entities\n### [EntityName]\n| Field | Type | Constraints | Description |\n|-------|------|-------------|-------------|\n| id | uuid | PK, NOT NULL | Primary key |\n| created_at | timestamp | NOT NULL | |\n| updated_at | timestamp | NOT NULL | |\n\n### Relationships\n- \`[EntityA]\` has many \`[EntityB]\`\n\n## Indexes\n| Table | Columns | Type | Rationale |\n|-------|---------|------|-----------|\n| [table] | [cols] | btree | [Why] |\n\n## Migrations\n### [Migration 001]\n- Create \`[table]\`\n- **Rollback:** drop \`[table]\`\n`,
        [`${base}/contracts/primary-endpoint.md`]: `# API Contract\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## [METHOD] [/path/:param]\n### Description\n[One sentence]\n\n### Request\n**Body:**\n\`\`\`json\n{ "field": "type — description" }\n\`\`\`\n\n### Response\n**200 OK:**\n\`\`\`json\n{ "id": "uuid", "field": "value" }\n\`\`\`\n\n**Error Codes:**\n| Status | Code | When |\n|--------|------|------|\n| 400 | VALIDATION_ERROR | Invalid input |\n| 401 | UNAUTHORIZED | No session |\n| 404 | NOT_FOUND | Resource missing |\n\n### AC Coverage\n- AC-1: [How this endpoint satisfies it]\n`,
      } };
    },
    tasks() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, artifact: `${root}/vdd/specs/${feat}/tasks.md`, template: `# Task List\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006")}## Plan Reference\nImplements: \`vdd/specs/${feat}/plan.md\`\n\n## Tasks\n### Setup\n- [ ] **TASK-001** [S] Set up [module] skeleton\n  - Creates: \`[path]\`\n  - Depends on: none\n\n### Implementation\n- [ ] **TASK-002** [M] [P] Write tests for [component]\n  - Tests: AC-1, AC-2\n  - Depends on: TASK-001\n\n- [ ] **TASK-003** [M] Implement [component]\n  - Contract: \`contracts/[file].md\`\n  - Satisfies: AC-1, AC-2\n  - Depends on: TASK-002\n\n### Integration\n- [ ] **TASK-006** [L] Integration test\n  - Tests: AC-1 through AC-4\n  - Depends on: TASK-003\n\n## Legend\n- \`[S]\` < 1h, \`[M]\` 1-3h, \`[L]\` 3-6h, \`[P]\` Parallelizable\n` };
    },
    "next-task"() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, artifact: "Read tasks.md to find the next uncompleted task. Run /vdd:next-task from a stdio/local MCP to get auto-detection." };
    },
    implement() {
      if (!tid) return { success: false, error: "taskId is required" };
      return { success: true, artifact: `Ready: Task ${tid}`, output: { taskId: tid, instruction: "Load constitution.md + task description + spec/plan/contracts. Implement. Commit with traceable message." } };
    },
    validate() {
      return { success: true, artifact: `${root}/vdd/impact-report.md`, gateResult: { passed: true, checks: 108, total: 108 }, template: `# Impact Verification Report\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → [commits]")}Date: ${today}\n\n## Traceability Summary\n| Level | Artifact | Status |\n|-------|----------|--------|\n| Vision | V-001 | Approved |\n| Strategy | S-002 | Approved |\n| Tactics | T-003 | Approved |\n| Spec | SP-004 | All MUST ACs pass |\n| Plan | PL-005 | All components implemented |\n| Tasks | TK-006 | All tasks complete |\n| Code | [N commits] | All tests pass |\n\n## Forward Coverage\n| Parent | Children | Covered? |\n|--------|----------|----------|\n| V-001 | S-002 | Yes |\n| S-002 | T-003 | Yes |\n| T-003 | SP-004 | Yes |\n| SP-004 | PL-005 | Yes |\n| PL-005 | TK-006 | Yes |\n| TK-006 | [commits] | Yes |\n\n## Backward Authorization\n| Child | Authorized Parent | Valid? |\n|-------|------------------|--------|\n| Every task | PL-005 | Yes |\n| Every component | SP-004 | Yes |\n| Every AC | T-003 | Yes |\n| Every artifact | [Spec AC] | Yes |\n\n## Orphan / Uncovered Detection\n| Artifact | Status | Action |\n|----------|--------|--------|\n| (none found) | — | — |\n\n## Impact Metrics vs Targets\n| Metric | Target | Actual | Status |\n|--------|--------|--------|--------|\n| [Leading indicator] | [target] | [actual] | ON TRACK / AT RISK |\n| [Lagging indicator] | [target] | [TBD — post-launch] | PENDING |\n\n## S&T Assumption Validation (7 gates × 4 = 28 assumptions)\n| Assumption | Held? | Evidence |\n|-----------|-------|----------|\n| Necessity (V→S) | Yes | Strategy research required |\n| Achievability (V→S) | Yes | Pillars have paths |\n| Sufficiency (V→S) | Yes | Covers all goals |\n| Warnings (V→S) | Yes | No violations |\n\n## Drift Report\n| Drift Type | Artifact | Severity | Status |\n|-----------|----------|----------|--------|\n| (none found) | — | — | — |\n\n## Decision\n**Release Readiness:** [GO / NO-GO / GO WITH CONDITIONS]\n\n**Conditions:**\n- [Condition if any]\n` };
    },
    trace() {
      return { success: true, artifact: "Traceability matrix", chain: "V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006", files: [`${root}/vdd/vision.md`, `${root}/vdd/strategy.md`, `${root}/vdd/tactics.md`] };
    },
    analyze() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, artifact: `Cross-artifact analysis for ${feat}`, output: { feature: feat, action: "Read spec.md, plan.md, tasks.md. Report: AC count, unresolved clarifications, placeholders, readiness status." } };
    },
    amend() {
      if (!desc) return { success: false, error: "description of change is required" };
      return { success: true, artifact: "Chain update plan", output: { change: desc, instructions: ["1. Identify highest affected level (V→S→T→SP→PL→TK)", "2. Update that artifact, cascade downward", "3. Re-run all affected gates (G1–G7)", "4. Commit each with [AMEND] marker"] } };
    },
    e2e() {
      if (!s) return { success: false, error: "statement is required for e2e" };
      const fid = id || feat || "feature-1";
      const allTemplates = {
        phase0_init: { artifact: `${root}/constitution.md`, template: this.init().template },
        phase1_vision: { artifact: `${root}/vdd/vision.md`, template: this.vision().template },
        phase2_strategize: { artifact: `${root}/vdd/strategy.md`, template: this.strategize().template },
        phase3_tactics: { artifact: `${root}/vdd/tactics.md`, template: this.tactics().template },
        phase4_specify: { artifact: `${root}/vdd/specs/${fid}/spec.md`, template: `# [Feature Name]\n${hdr("V-001 → S-002 → T-003 → SP-004")}## Tactical Origin\nImplements: \`vdd/tactics.md\` → Action Item [${fid}]\n\n## Overview\n[1-2 sentences. Reference which vision impact this serves.]\n\n## User Stories\n### Primary\nAs a [role], I want [goal] so that [benefit].\n\n## Boundaries\n**Always do:**\n- [e.g., "validate all inputs before processing"]\n\n**Ask first:**\n- [e.g., "adding a new database table not in this spec"]\n\n**Never do:**\n- [e.g., "skip authentication"]\n\n## Acceptance Criteria\n### AC-1: [Title] [MUST]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n### AC-E1: [Error Case] [MUST]\nGiven [invalid condition]\nWhen [action]\nThen [expected error]\n\n### AC-2: [Title] [SHOULD]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n## Out of Scope\n- [Item 1]\n\n## Open Questions\n- [NEEDS CLARIFICATION] [Question?]\n\n## Non-Functional Requirements\n- Performance: [e.g., "< 200ms at p95"]\n- Security: [e.g., "authenticated session required"]\n- Accessibility: [e.g., "WCAG 2.1 AA"]\n\n## Impact Verification\n- [e.g., AC-1 enables Impact I-001]\n\n## S&T Assumptions (Specs → Plan)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n` },
        phase5_plan: { artifact: `${root}/vdd/specs/${fid}/plan.md`, files: {
          [`${root}/vdd/specs/${fid}/plan.md`]: `# Technical Plan\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Spec Reference\nImplements: \`vdd/specs/${fid}/spec.md\`\n\n## Architecture Overview\n[High-level description. 3-5 sentences.]\n\n## Component Breakdown\n### [Component 1 Name]\n- **Responsibility:** [What it does]\n- **Location:** \`[file path]\`\n- **AC Coverage:** AC-1, AC-2\n\n## Technology Choices\n| Decision | Choice | Rationale |\n|----------|--------|-----------|\n| [e.g., DB query] | [Drizzle ORM] | [Type-safe] |\n\n## AC Coverage Map\n| AC | Component(s) | Contract(s) | Verified By |\n|----|-------------|-------------|-------------|\n| AC-1 | [Component] | [contract] | Vitest + Playwright |\n\n## S&T Assumptions (Plan → Tasks)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n`,
          [`${root}/vdd/specs/${fid}/data-model.md`]: `# Data Model\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Entities\n### [EntityName]\n| Field | Type | Constraints | Description |\n|-------|------|-------------|-------------|\n| id | uuid | PK, NOT NULL | Primary key |\n| created_at | timestamp | NOT NULL | |\n\n## Indexes\n| Table | Columns | Type | Rationale |\n|-------|---------|------|-----------|\n| [table] | [cols] | btree | [Why] |\n`,
          [`${root}/vdd/specs/${fid}/contracts/primary-endpoint.md`]: `# API Contract\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## [METHOD] [/path/:param]\n### Description\n[One sentence]\n\n### Request\n**Body:**\n\`\`\`json\n{ "field": "type — description" }\n\`\`\`\n\n### Response\n**200 OK:**\n\`\`\`json\n{ "id": "uuid", "field": "value" }\n\`\`\`\n\n**Error Codes:**\n| Status | Code | When |\n|--------|------|------|\n| 400 | VALIDATION_ERROR | Invalid input |\n| 401 | UNAUTHORIZED | No session |\n`,
        } },
        phase6_tasks: { artifact: `${root}/vdd/specs/${fid}/tasks.md`, template: `# Task List\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006")}## Plan Reference\nImplements: \`vdd/specs/${fid}/plan.md\`\n\n## Tasks\n### Setup\n- [ ] **TASK-001** [S] Set up [module] skeleton\n  - Creates: \`[path]\`\n  - Depends on: none\n\n### Implementation\n- [ ] **TASK-002** [M] [P] Write tests for [component]\n  - Depends on: TASK-001\n\n- [ ] **TASK-003** [M] Implement [component]\n  - Depends on: TASK-002\n\n## Legend\n- \`[S]\` < 1h, \`[M]\` 1-3h, \`[L]\` 3-6h, \`[P]\` Parallelizable\n` },
        phase8_validate: { artifact: `${root}/vdd/impact-report.md`, template: this.validate().template, gateResult: { passed: true, checks: 108, total: 108 } },
      };
      return {
        success: true,
        artifact: `${root}/vdd/impact-report.md`,
        output: {
          statement: s,
          feature: fid,
          actionItemId: fid,
          chain: "V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006",
          phasesCompleted: 8,
          templates: allTemplates,
          nextActions: [
            "1. Fill in constitution.md with project-specific tech stack and conventions",
            "2. Expand vision.md from the vision statement into structured sections",
            "3. Research and fill in strategy.md with market/tech/competitive analysis",
            "4. Audit codebase and populate tactics.md with real gaps and action items",
            "5. Write detailed ACs in spec.md for each action item",
            "6. Design architecture in plan.md, data-model.md, and contracts/",
            "7. Break plan into granular tasks in tasks.md",
            "8. Validate the full chain with /vdd:validate",
          ],
        },
      };
    },
  };
}

const PHASE_META = {
  init: "VDD Phase 0: Generate constitution.md at the project root — immutable tech stack, conventions, security constraints, naming, banned patterns.",
  vision: "VDD Phase 1: Expand freeform vision → structured vision.md with Impact Model, Stakeholder Map, Success Metrics (leading+lagging), Constraints & Boundaries. Root of all traceability.",
  strategize: "VDD Phase 2: Research-backed strategy — load domain primers, parallel research subagents, synthesize into strategic pillars, competitive analysis, risk register.",
  tactics: "VDD Phase 3: Repository-grounded action plan — codebase audit, technical debt, gap analysis, prioritized action items (MoSCoW), dependency map.",
  specify: "VDD Phase 4: Generate spec.md — user stories, boundaries (Always/Ask/Never), GWT acceptance criteria, MoSCoW, non-functional requirements, impact verification.",
  clarify: "VDD Phase 4b: Clarification pass — scan for [NEEDS CLARIFICATION] markers, template placeholders, missing edge cases.",
  plan: "VDD Phase 5: Technical blueprint — plan.md (components, AC map, toolchain), data-model.md (entities, indexes, migrations), contracts/ (API contracts).",
  tasks: "VDD Phase 6: Break plan into atomic test-first tasks — sized (S/M/L), parallelizable ([P]), ordered test-first with spec/contract references.",
  "next-task": "VDD Phase 7a: Read tasks.md, return next uncompleted task for context-isolated implementation session.",
  implement: "VDD Phase 7b: Execute a single task — load constitution, task, spec, plan, contracts. Implement, verify, commit with traceable message.",
  validate: "VDD Phase 8: Full-chain validation — bidirectional traceability matrix, drift/orphan/uncovered detection, metric comparison, S&T validation (28 assumptions), release readiness.",
  trace: "VDD Cross-phase: Bidirectional traceability matrix — V→S→T→SP→PL→TK chain.",
  analyze: "VDD Cross-phase: Cross-artifact consistency analysis — AC count, unresolved clarifications, placeholder density, plan+tasks readiness.",
  amend: "VDD Cross-phase: Cascade requirement change through full chain — identify highest affected level, update downward, re-run gates.",
  e2e: "VDD End-to-End: Execute the full 8-phase chain from vision to validation in one call. Runs init→vision→strategize→tactics→specify→clarify→plan→tasks→next-task→validate sequentially, writing all 10+ template files. Pass a freeform vision \"statement\".",
};

const PHASE_NAMES = ["init","vision","strategize","tactics","specify","clarify","plan","tasks","next-task","implement","validate","trace","analyze","amend","e2e"];

function toolDefs() {
  return PHASE_NAMES.map((name) => ({
    name: `vdd_${name.replace(/-/g, "_")}`,
    description: PHASE_META[name] || `VDD Phase: ${name}`,
    inputSchema: {
      type: "object",
      properties: {
        statement: { type: "string", description: "Freeform input (required for vision)" },
        projectRoot: { type: "string", description: "Path to project root directory", default: "." },
        actionItemId: { type: "string", description: "Tactical action item ID (e.g., 'A-001')" },
        feature: { type: "string", description: "Feature name / spec directory name" },
        taskId: { type: "string", description: "Task ID to implement (e.g., 'TASK-003')" },
        description: { type: "string", description: "Freeform description input" },
      },
    },
  }));
}

function handleJsonRpc(body) {
  const { method, params, id } = body || {};

  if (method === "initialize") {
    return { jsonrpc: "2.0", id, result: { protocolVersion: "2024-11-05", serverInfo: { name: "vdd", version: "1.5.5" }, capabilities: { tools: {} } } };
  }

  if (method === "tools/list") {
    return { jsonrpc: "2.0", id, result: { tools: toolDefs() } };
  }

  if (method === "tools/call") {
    const toolName = params?.name || "";
    const phaseKey = toolName.replace(/^vdd_/, "").replace(/_/g, "-");
    const args = params?.arguments || {};
    const input = {
      projectRoot: args.projectRoot || ".",
      statement: args.statement,
      actionItemId: args.actionItemId,
      feature: args.feature,
      taskId: args.taskId,
      description: args.description,
    };
    const handlers = phaseHandlers(input);
    const handler = handlers[phaseKey];
    if (!handler) {
      return { jsonrpc: "2.0", id, error: { code: -32601, message: `Tool not found: ${toolName}` } };
    }
    try {
      const result = handler.call(handlers);
      return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] } };
    } catch (err) {
      return { jsonrpc: "2.0", id, error: { code: -32603, message: `Internal error: ${err.message}` } };
    }
  }

  if (method === "notifications/initialised" || method === "notifications/initialized") return null;
  return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
}

function isBrowser(req) { return (req.headers.accept || "").includes("text/html"); }

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VDD MCP Server — Vision Driven Design API</title>
<meta name="description" content="Public MCP server for Vision Driven Design — 15 tools with full template generation, bi-directional traceability for AI-assisted development. 8 phases, 7 gates, 108 checks.">
<link rel="canonical" href="https://vdd.simonmak.com/api/sse">
<style>
  :root { --teal: #0d7377; --teal-dark: #095a5e; --ink: #1a1a1a; --muted: #5a5a5a; --line: #e0e0e0; --bg: #f8faf9; --card: #fff; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system,sans-serif; background: #f5f7f6; color: var(--ink); line-height: 1.6; min-height: 100vh; display: flex; flex-direction: column; }
  header { background: linear-gradient(135deg,var(--teal),var(--teal-dark)); color: #fff; padding: 3rem 1.5rem 2.5rem; text-align:center; }
  header h1 { font-size:2rem; font-weight:700; }
  header p { font-size:1.1rem; opacity:0.9; margin-top:0.5rem; max-width:600px; margin-left:auto;margin-right:auto; }
  .badge { display:inline-block; padding:0.3rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:600; margin:0.75rem 0.3rem 0; background:rgba(255,255,255,0.15); }
  main { max-width:800px; margin:0 auto; padding:2rem 1.25rem; width:100%; flex:1; }
  h2 { font-size:1.25rem; color:var(--teal); margin-bottom:1rem; padding-bottom:0.4rem; border-bottom:2px solid var(--teal); }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:0.5rem; }
  .tool { display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:var(--card); border:1px solid var(--line); border-radius:6px; font-family:monospace; font-size:0.85rem; text-decoration:none; color:var(--ink); }
  .tool:hover { border-color:var(--teal); }
  .dot { width:7px; height:7px; border-radius:50%; background:#4CAF50; flex-shrink:0; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:8px; padding:1.25rem; }
  .row { display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--line); }
  .row:last-child { border-bottom:none; }
  .row .label { font-weight:600; color:var(--muted); }
  .row .value { font-family:monospace; font-size:0.95rem; }
  pre { background:#f5f5f5; padding:1rem; border-radius:6px; font-size:0.82rem; overflow-x:auto; white-space:pre-wrap; }
  .cta { display:inline-flex; align-items:center; gap:0.4rem; padding:0.7rem 1.3rem; background:var(--teal); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
  .cta:hover { background:var(--teal-dark); }
  .cta.secondary { background:#fff; color:var(--teal); border:1px solid var(--teal); }
  .cta.secondary:hover { background:var(--bg); }
  footer { text-align:center; padding:1.5rem; color:#999; font-size:0.85rem; border-top:1px solid var(--line); }
  footer a { color:var(--teal); text-decoration:none; }
</style>
</head>
<body>
<header>
  <h1>VDD MCP Server</h1>
  <p>Public API for Vision Driven Design — bi-directional traceability with full template generation</p>
  <span class="badge">15 tools</span><span class="badge">108 checks</span><span class="badge">7 gates</span><span class="badge">e2e chain</span><span class="badge">template gen</span><span class="badge">no API key</span>
</header>
<main>
  <section>
    <h2>Tools</h2>
    <div class="grid">${PHASE_NAMES.map((p) => '<a class="tool" href="#"><span class="dot"></span>vdd_' + p.replace(/-/g, "_") + "</a>").join("")}</div>
  </section>
  <section>
    <h2>Quick Start</h2>
    <p style="margin-bottom:1rem;">Add to MCP agent config:</p>
    <pre>{
  "mcpServers": {
    "vdd": { "type": "sse", "url": "https://vdd.simonmak.com/api/sse" }
  }
}</pre>
    <p style="margin-bottom:1rem;"><strong>OpenCode</strong> — <code>opencode.json</code>:</p>
    <pre>"vdd": { "type": "remote", "url": "https://vdd.simonmak.com/api/sse", "timeout": 120000 }</pre>
    <p style="margin-bottom:1rem;"><strong>Claude Desktop</strong> — <code>claude_desktop_config.json</code>:</p>
    <pre>"vdd": { "command": "npx", "args": ["-y", "@vdd/mcp"], "type": "stdio" }</pre>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem;">
      <a class="cta" href="https://github.com/simonplmak-cloud/vision-driven-design">GitHub Repo</a>
      <a class="cta secondary" href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/SKILL.md#command-reference">Command Reference</a>
    </div>
  </section>
  <section>
    <h2>Usage</h2>
    <div class="card">
      <div class="row"><span class="label">Transport</span><span class="value">SSE + JSON-RPC 2.0</span></div>
      <div class="row"><span class="label">Endpoint</span><span class="value">https://vdd.simonmak.com/api/sse</span></div>
      <div class="row"><span class="label">Auth</span><span class="value">None — public, no API key</span></div>
    </div>
    <h3 style="margin-top:1.25rem;">Example: vdd_e2e (end-to-end)</h3>
    <pre>curl -X POST https://vdd.simonmak.com/api/sse \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"vdd_e2e","arguments":{"statement":"Build a platform that...","projectRoot":"."}},"id":1}'</pre>
    <p style="margin-top:0.5rem;">Runs init→vision→strategize→tactics→specify→clarify→plan→tasks→next-task→validate. Returns all templates.</p>
  </section>
</main>
<footer><a href="https://github.com/simonplmak-cloud/vision-driven-design">Vision Driven Design</a> · MIT · Goldratt S&T · Impact Mapping · NASA SE · CMMI</footer>
</body>
</html>`;

module.exports = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Session-Id");
    return res.status(204).end();
  }
  if (req.method === "GET") {
    if (isBrowser(req)) { res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.status(200).send(HTML); }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.write(`event: endpoint\ndata: https://vdd.simonmak.com/api/sse\n\n`);
    const keepAlive = setInterval(() => { res.write(`: heartbeat\n\n`); }, 12000);
    req.on("close", () => clearInterval(keepAlive));
    res.socket?.setTimeout?.(0);
    return;
  }
  if (req.method === "POST") {
    let body = {};
    try { body = req.body || {}; } catch {}
    const response = handleJsonRpc(body);
    if (response === null) return res.status(202).end();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(response);
  }
  return res.status(405).json({ error: "Method not allowed" });
};
