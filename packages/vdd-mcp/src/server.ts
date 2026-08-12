import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import { PHASES, type VddContext, type VddPhaseInput } from '@vdd/engine';

const PHASE_META: Record<string, { description: string; instructions: string }> = {
  init: {
    description: 'VDD Phase 0: Generate constitution.md at the project root — encodes immutable tech stack, conventions, security constraints, naming conventions, and banned patterns. Applied to every subsequent phase.',
    instructions: 'Run this first. AI agent should read the existing codebase (package.json, tsconfig, existing patterns) and fill in the constitution template with actual project values.',
  },
  vision: {
    description: 'VDD Phase 1: Expand freeform vision statement into structured vision.md — defines Impact Model (Goal, Actors, Impacts), Stakeholder Map, Success Metrics (leading + lagging), Constraints & Boundaries, and Target Domains. This is the root of all traceability.',
    instructions: 'Provide a 1-3 paragraph freeform "statement" describing the impact you want to create. The AI agent should then expand and formalize it into the vision template. The template file is written to vdd/vision.md.',
  },
  strategize: {
    description: 'VDD Phase 2: Research-backed strategy — loads domain primers based on vision target domains, spawns parallel research subagents (Market, Competitive, Technology, Impact, Domain), synthesizes findings into strategic pillars, competitive analysis, and risk register.',
    instructions: 'Requires vdd/vision.md to exist. AI agent should load the relevant domain-primers (webapp.md, data-storage.md, etc.), run web searches for competitive analysis, consult Context7 for technology feasibility, and fill in the strategy template at vdd/strategy.md.',
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
};

export function createVddMcpServer(): McpServer {
  const server = new McpServer({ name: 'vdd', version: '1.5.5' });

  for (const name of Object.keys(PHASES)) {
    const toolName = `vdd_${name.replace(/-/g, '_')}`;
    const meta = PHASE_META[name];
    server.registerTool(
      toolName,
      {
        description: meta?.description ?? `VDD Phase: ${name}`,
        inputSchema: {
          statement: z.string().optional().describe('Freeform input (required for vision)'),
          projectRoot: z.string().default('.').describe('Path to project root directory'),
          actionItemId: z.string().optional().describe('Tactical action item ID (e.g., "A-001")'),
          feature: z.string().optional().describe('Feature name (spec directory name)'),
          taskId: z.string().optional().describe('Task ID to implement (e.g., "TASK-003")'),
          description: z.string().optional().describe('Freeform description input'),
        },
      },
      async (params: Record<string, unknown>) => {
        const ctx: VddContext = { projectRoot: String(params.projectRoot || '.'), mode: 'auto' };
        const input: VddPhaseInput = {
          statement: params.statement as string | undefined,
          actionItemId: params.actionItemId as string | undefined,
          feature: params.feature as string | undefined,
          taskId: params.taskId as string | undefined,
          description: params.description as string | undefined,
          json: false,
        };
        const result = await PHASES[name](input, ctx);
        const responseText = JSON.stringify({
          ...result,
          _phase: name,
          _sdt: meta?.instructions ?? '',
        }, null, 2);
        return { content: [{ type: 'text' as const, text: responseText }] };
      }
    );
  }

  return server;
}

export async function startStdioServer() {
  const server = createVddMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
