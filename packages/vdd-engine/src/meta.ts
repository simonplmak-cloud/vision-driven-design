// Canonical metadata shared by the engine, MCP server, and CLI.
// Single source of truth for phase names, phase descriptions/instructions,
// per-phase tool requirements, research subagent dispatch specs, and domain primers.

export const PHASE_NAMES = [
  'init',
  'vision',
  'strategize',
  'tactics',
  'specify',
  'clarify',
  'plan',
  'tasks',
  'next-task',
  'implement',
  'validate',
  'trace',
  'analyze',
  'amend',
  'e2e',
  'detect-environment',
] as const;

export type PhaseName = (typeof PHASE_NAMES)[number];

export interface PhaseMeta {
  description: string;
  instructions: string;
}

export const PHASE_META: Record<PhaseName, PhaseMeta> = {
  init: {
    description: 'VDD Phase 0: Generate constitution.md at the project root — encodes immutable tech stack, conventions, security constraints, naming conventions, and banned patterns. Applied to every subsequent phase.',
    instructions: 'Run this first. AI agent should read the existing codebase (package.json, tsconfig, existing patterns) and fill in the constitution template with actual project values.',
  },
  vision: {
    description: 'VDD Phase 1: Expand freeform vision statement into structured vision.md — defines Impact Model (Goal, Actors, Impacts), Stakeholder Map, Success Metrics (leading + lagging), Constraints & Boundaries, and Target Domains. This is the root of all traceability.',
    instructions: 'Provide a 1-3 paragraph freeform "statement" describing the impact you want to create. The AI agent should then expand and formalize it into the vision template. The template file is written to vdd/vision.md.',
  },
  strategize: {
    description: 'VDD Phase 2: Research-backed strategy — resolves domain primers from vision target domains, emits 5 parallel research subagent dispatch specs (Market, Competitive, Technology, Impact, Domain), and synthesizes findings into strategic pillars, competitive analysis, and risk register.',
    instructions: 'Requires vdd/vision.md to exist. Dispatch the returned research subagents using your environment tools (Brave Search, Perplexity, Context7, gh_grep, Playwright), then re-call vdd_strategize with researchFindings to synthesize vdd/strategy.md. Pass availableTools to detect missing capabilities.',
  },
  tactics: {
    description: 'VDD Phase 3: Repository-grounded action plan — full codebase audit, technical debt assessment, gap analysis, prioritized action items (MoSCoW), dependency map, and infrastructure requirements.',
    instructions: 'Requires vdd/strategy.md. AI agent should audit the existing codebase: scan directory structure, read package manifests, identify existing modules, assess technical debt, map gaps to strategy pillars, and produce prioritized action items (A-001, A-002, ...). Output to vdd/tactics.md.',
  },
  specify: {
    description: 'VDD Phase 4: Generate spec.md for a tactical action item. Includes user stories, boundaries (Always/Ask/Never), acceptance criteria (Given/When/Then), MoSCoW priorities, non-functional requirements, and impact verification.',
    instructions: 'Pass actionItemId (e.g., "A-001") or a freeform "description". The AI agent should surface assumptions, write precise ACs with measurable criteria, define boundaries, and connect each AC to a vision impact. Output to vdd/specs/<id>/spec.md.',
  },
  clarify: {
    description: 'VDD Phase 4b: Standalone clarification pass on an existing spec — scans for [NEEDS CLARIFICATION] markers, template placeholders, and missing edge cases. Returns a list of items to resolve.',
    instructions: 'Pass "feature" (the spec directory name). AI agent reads the spec, resolves every [NEEDS CLARIFICATION] item, replaces [e.g.] placeholders with concrete values, and adds edge-case ACs (AC-E*) for every happy-path MUST AC.',
  },
  plan: {
    description: 'VDD Phase 5: Technical blueprint — generates plan.md (component breakdown, AC coverage map, technology choices, verification toolchain), data-model.md (entities, indexes, migrations), and contracts/ (API contracts with request/response/error schemas).',
    instructions: 'Pass "feature". AI agent translates the spec into architecture: component decomposition, technology decisions, AC→component mapping, verification tool selection (Vitest, Playwright, Browserless, Sentry), data model design, and API contract definitions. Outputs 3 files.',
  },
  tasks: {
    description: 'VDD Phase 6: Break the plan into atomic test-first tasks. Each task references specific ACs and contracts. Tasks are sized (S/M/L), marked parallelizable ([P]), and ordered test-first.',
    instructions: 'Pass "feature". AI agent decomposes each plan component into granular tasks with test-first ordering (test task before impl task). Every impl task traces to a contract and AC. Output to vdd/specs/<feature>/tasks.md.',
  },
  'next-task': {
    description: 'VDD Phase 7a: Read tasks.md and return the next uncompleted task. Use this before each implementation session to maintain context isolation.',
    instructions: 'Pass "feature". Returns the first uncompleted task line from tasks.md. The AI agent should then start a fresh context window for that task.',
  },
  implement: {
    description: 'VDD Phase 7b: Execute a single task — load constitution, task description, spec, plan, contracts. Implement, verify, and commit. One commit per task with full impact-chain commit message.',
    instructions: 'Pass "taskId". AI agent loads constitution + task description + relevant spec/plan/contracts. Implements with constraints from Boundaries section. Commits with traceable message format.',
  },
  validate: {
    description: 'VDD Phase 8: Full-chain validation — bidirectional traceability matrix, drift detection, orphan code detection, uncovered vision goals, impact metrics vs targets, S&T assumption validation (all 28 across 7 gates), and release readiness decision.',
    instructions: 'AI agent generates the complete impact-verification report: forward coverage (V→S→T→SP→PL→TK→code), backward authorization, orphan detection, uncovered detection, metric comparison, S&T validation, and drift report. Output to vdd/impact-report.md.',
  },
  trace: {
    description: 'VDD Cross-phase: Generate bidirectional traceability matrix showing the full V→S→T→SP→PL→TK chain for the current project.',
    instructions: 'AI agent reads all existing artifacts in vdd/ and produces a traceability matrix mapping every level to its parent and children.',
  },
  analyze: {
    description: 'VDD Cross-phase: Cross-artifact consistency analysis — checks spec AC count, unresolved clarifications, placeholder density, plan+tasks existence.',
    instructions: 'Pass "feature". AI agent reads spec.md, plan.md, tasks.md for the feature and reports metrics: AC count, unresolved [NEEDS CLARIFICATION] items, [e.g.] placeholder count, and readiness status.',
  },
  amend: {
    description: 'VDD Cross-phase: Cascade a requirement change through the full chain. Identify the highest affected level and update downward through V→S→T→SP→PL→TK. Re-run all affected gates.',
    instructions: 'Pass "description" of what changed. AI agent identifies the highest affected level, updates all downstream artifacts, re-runs affected gates (G1–G7), and commits each updated artifact with [AMEND] marker.',
  },
  e2e: {
    description: 'VDD End-to-End: Execute the full 8-phase VDD chain from constitution to validation in one call. Runs init → vision → strategize → tactics → specify → clarify → plan → tasks → next-task → validate sequentially. Writes all 10+ template files with proper impact-chain headers. Accepts a freeform vision statement.',
    instructions: 'Pass "statement" with your vision. The tool runs all phases end-to-end, creating every artifact: constitution.md, vision.md, strategy.md, tactics.md, spec.md, plan.md, data-model.md, contracts/, tasks.md, and impact-report.md. Use optional "feature" (default "feature-1") to customize the spec directory name. The AI agent then fills in each template with domain-specific content.',
  },
  'detect-environment': {
    description: 'VDD Environment Detection: Reports which tools/MCPs are required and optional per phase, and — when the host agent supplies its availableTools — which capabilities are present vs. missing, plus resulting research limitations.',
    instructions: 'Pass availableTools (array of MCP/tool names available to the host agent, e.g. ["brave-search","perplexity","context7","gh_grep","playwright","filesystem"]). Returns a per-phase capability report. Used before Phase 2 (strategize) to plan research subagent dispatch.',
  },
};

// Canonical tool keys used to match host-provided `availableTools`.
export const TOOL_KEYS = [
  'brave-search',
  'perplexity',
  'context7',
  'gh_grep',
  'playwright',
  'browserless',
  'filesystem',
  'shell',
] as const;

export interface ToolRequirements {
  required: string[];
  optional: string[];
}

// Per-phase tool requirements — mirrors references/ai-agent-patterns.md "AI Tool Selection Per Phase".
export const TOOL_REQUIREMENTS: Record<PhaseName, ToolRequirements> = {
  init: { required: [], optional: [] },
  vision: { required: [], optional: [] },
  strategize: { required: ['brave-search', 'perplexity'], optional: ['context7', 'gh_grep', 'playwright', 'browserless'] },
  tactics: { required: ['filesystem'], optional: ['shell'] },
  specify: { required: [], optional: [] },
  clarify: { required: ['filesystem'], optional: [] },
  plan: { required: ['filesystem'], optional: ['context7'] },
  tasks: { required: [], optional: [] },
  'next-task': { required: ['filesystem'], optional: [] },
  implement: { required: ['filesystem'], optional: ['shell'] },
  validate: { required: ['filesystem'], optional: ['shell'] },
  trace: { required: ['filesystem'], optional: [] },
  analyze: { required: ['filesystem'], optional: [] },
  amend: { required: ['filesystem'], optional: [] },
  e2e: { required: ['filesystem'], optional: ['brave-search', 'perplexity', 'context7', 'gh_grep', 'playwright', 'browserless', 'shell'] },
  'detect-environment': { required: [], optional: [] },
};

export interface ResearchSubagent {
  id: string;
  name: string;
  role: string;
  tools: string[];
  input: string;
  output: string;
  timeoutSeconds: number;
  requiresCitations: boolean;
}

// The 5 parallel research subagents dispatched during Phase 2 (Strategy).
// Mirrors references/ai-agent-patterns.md "Parallel Research Subagents".
export const RESEARCH_SUBAGENTS: ResearchSubagent[] = [
  {
    id: 'market',
    name: 'Market Research',
    role: 'Market size, growth, target-user demographics, trends, and regulatory factors',
    tools: ['brave-search', 'perplexity'],
    input: 'vision.md (goal, actors, impacts, target domains)',
    output: '300-500 word summary with citations',
    timeoutSeconds: 120,
    requiresCitations: true,
  },
  {
    id: 'competitive',
    name: 'Competitive Analysis',
    role: 'Top competitors, features, pricing, user sentiment, weaknesses, adjacent products',
    tools: ['brave-search', 'playwright'],
    input: 'vision.md + domain-primers (market section)',
    output: '300-500 word competitive matrix with citations',
    timeoutSeconds: 120,
    requiresCitations: true,
  },
  {
    id: 'technology',
    name: 'Technology Assessment',
    role: 'Viable technologies, trade-offs, technology risks, proven infrastructure patterns',
    tools: ['context7', 'gh_grep'],
    input: 'vision.md + constitution.md (tech stack) + domain-primers (tech section)',
    output: '300-500 word technology fit assessment',
    timeoutSeconds: 120,
    requiresCitations: true,
  },
  {
    id: 'impact',
    name: 'Impact Feasibility',
    role: 'Similar impact attempts, what worked/failed, impact measurement, realistic timelines',
    tools: ['perplexity'],
    input: 'vision.md (impact model + success metrics)',
    output: '300-500 word feasibility analysis with case studies',
    timeoutSeconds: 120,
    requiresCitations: true,
  },
  {
    id: 'domain',
    name: 'Domain Deep-Dive',
    role: 'Domain-specific constraints, anti-patterns, and impact measurement best practices',
    tools: ['domain-primers'],
    input: 'vision.md + domain-primers',
    output: '300-500 word domain-specific constraints and patterns',
    timeoutSeconds: 120,
    requiresCitations: false,
  },
];

export interface DomainPrimer {
  file: string;
  label: string;
  condition: 'unconditional' | 'webapp' | 'data-storage' | 'etl' | 'infrastructure' | 'safety-critical';
  summary: string;
}

// The 7 domain primers. Mirrors SKILL.md "Domain Primers" table.
export const DOMAIN_PRIMERS: DomainPrimer[] = [
  { file: 'human-factors.md', label: 'Human Factors', condition: 'unconditional', summary: 'Behavioral economics, cognitive load, habit formation' },
  { file: 'verification-toolchain.md', label: 'Verification Toolchain', condition: 'unconditional', summary: 'Playwright, Browserless, Sentry, CI/CD quality pipeline' },
  { file: 'webapp.md', label: 'WebApp', condition: 'webapp', summary: 'UX, accessibility, performance, framework evaluation' },
  { file: 'data-storage.md', label: 'Data Storage', condition: 'data-storage', summary: 'Schema design, indexing, data governance' },
  { file: 'etl.md', label: 'ETL', condition: 'etl', summary: 'Pipeline architecture, data quality, streaming vs batch' },
  { file: 'infrastructure.md', label: 'Infrastructure', condition: 'infrastructure', summary: 'CI/CD, observability, security, scaling, disaster recovery' },
  { file: 'safety-critical.md', label: 'Safety-Critical', condition: 'safety-critical', summary: 'FMEA/FTA, safety integrity levels (DO-178C/IEC 62304)' },
];

function normalizeToolKey(tool: string): string {
  const t = tool.trim().toLowerCase();
  if (t === 'context7' || t === 'context-7' || t === 'context_7') return 'context7';
  if (t === 'gh_grep' || t === 'gh-grep' || t === 'ghgrep') return 'gh_grep';
  if (t === 'brave-search' || t === 'brave_search' || t === 'brave') return 'brave-search';
  if (t === 'browserless') return 'browserless';
  if (t === 'playwright') return 'playwright';
  if (t === 'perplexity') return 'perplexity';
  if (t === 'filesystem' || t === 'fs' || t === 'glob' || t === 'grep' || t === 'read') return 'filesystem';
  if (t === 'shell' || t === 'bash' || t === 'terminal') return 'shell';
  return t;
}

export interface EnvironmentReport {
  available: string[];
  phases: Record<PhaseName, { required: string[]; optional: string[]; requiredAvailable: boolean }>;
  missingRequired: string[];
  missingOptional: string[];
  researchLimitations: string[];
}

export function detectEnvironment(availableTools: string[] = []): EnvironmentReport {
  const available = new Set((availableTools ?? []).map(normalizeToolKey));
  const phases = {} as Record<PhaseName, { required: string[]; optional: string[]; requiredAvailable: boolean }>;
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];
  const researchLimitations: string[] = [];

  for (const name of PHASE_NAMES) {
    const req = TOOL_REQUIREMENTS[name];
    const requiredAvailable = req.required.every((t) => available.has(t));
    phases[name] = { required: [...req.required], optional: [...req.optional], requiredAvailable };
  }

  const strategyReq = TOOL_REQUIREMENTS.strategize;
  for (const t of strategyReq.required) {
    if (!available.has(t)) missingRequired.push(t);
  }
  for (const t of strategyReq.optional) {
    if (!available.has(t)) missingOptional.push(t);
  }

  if (!available.has('brave-search') && !available.has('perplexity')) {
    researchLimitations.push('No web-search or research tool available — Market/Competitive/Impact subagents cannot run. Strategy research is degraded to domain-primer only.');
  } else if (!available.has('perplexity')) {
    researchLimitations.push('Perplexity unavailable — Impact Feasibility subagent cannot run; Market Research falls back to Brave Search only.');
  } else if (!available.has('brave-search')) {
    researchLimitations.push('Brave Search unavailable — Market/Competitive subagents degraded to Perplexity research only.');
  }
  if (!available.has('context7') && !available.has('gh_grep')) {
    researchLimitations.push('Context7 and gh_grep unavailable — Technology Assessment subagent cannot run.');
  }
  if (!available.has('filesystem')) {
    researchLimitations.push('Filesystem unavailable — Tactics audit and drift detection cannot run.');
  }

  return { available: [...available], phases, missingRequired, missingOptional, researchLimitations };
}

export function domainPrimersForTargets(targetDomains: string[]): DomainPrimer[] {
  const normalized = new Set(targetDomains.map((d) => d.trim().toLowerCase()));
  return DOMAIN_PRIMERS.filter((p) => {
    if (p.condition === 'unconditional') return true;
    return normalized.has(p.condition);
  });
}
