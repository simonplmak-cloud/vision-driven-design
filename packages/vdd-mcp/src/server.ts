import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import { PHASES, PHASE_NAMES, PHASE_META, type VddContext, type VddPhaseInput } from '@simonmak-ascent/engine';

// Shared field definitions, then a per-phase input schema so each tool advertises
// only the parameters it actually reads (feeds Glama's "Parameter Semantics" score).
const projectRoot = z.string().default('.').describe('Path to project root directory');
const statement = z.string().optional().describe('Freeform vision statement (required for vision/e2e)');
const statementReq = z.string().describe('Freeform vision statement');
const actionItemId = z.string().optional().describe('Tactical action item ID (e.g., "A-001")');
const feature = z.string().optional().describe('Feature name (spec directory name)');
const featureReq = z.string().describe('Feature name (spec directory name)');
const taskId = z.string().describe('Task ID to implement (e.g., "TASK-003")');
const description = z.string().optional().describe('Freeform description input');
const descriptionReq = z.string().describe('Description of the requirement change');
const availableTools = z.array(z.string()).optional().describe('MCP/tool names available to the host agent (e.g., ["brave-search","perplexity","context7","gh_grep","playwright","filesystem"])');
const capabilities = z.array(z.string()).optional().describe('Alias for availableTools');
const researchFindings = z.string().optional().describe('Consolidated research subagent findings to synthesize into strategy.md');
const artifactFiles = z.record(z.string(), z.string()).optional().describe('Map of artifact path → content for serverless validate/drift detection');
const maxPages = z.number().int().positive().optional().describe('Clone: max pages to crawl (default 200)');
const timeoutMs = z.number().int().positive().optional().describe('Clone: per-request timeout in ms');
const concurrency = z.number().int().positive().optional().describe('Clone: concurrent crawl workers (default 8)');
const crawl = z.boolean().optional().describe('Clone: run the crawl (default true)');
const browser = z.boolean().optional().describe('Clone: run browser/static capture (default true)');
const refresh = z.boolean().optional().describe('Clone: force re-crawl, ignore a fresh cached dataset');

const PHASE_INPUT_SCHEMAS: Record<string, Record<string, z.ZodType>> = {
  init: { projectRoot },
  vision: { statement: statementReq, projectRoot },
  strategize: { availableTools, capabilities, researchFindings, projectRoot },
  tactics: { projectRoot },
  specify: { feature, actionItemId, description, projectRoot },
  clarify: { feature: featureReq, projectRoot },
  plan: { feature: featureReq, projectRoot },
  tasks: { feature: featureReq, projectRoot },
  'next-task': { feature: featureReq, projectRoot },
  implement: { taskId, projectRoot },
  validate: { feature, artifactFiles, projectRoot },
  trace: { projectRoot },
  analyze: { feature: featureReq, projectRoot },
  amend: { description: descriptionReq, projectRoot },
  e2e: { statement: statementReq, feature, actionItemId, projectRoot },
  clone: { description, statement, maxPages, timeoutMs, concurrency, crawl, browser, refresh, projectRoot },
  'detect-environment': { availableTools, capabilities, projectRoot },
};

// MCP annotation hints feed Glama's Tool Definition Quality Score (Behavioral
// Transparency dimension). Read-only tools are safe to re-run; write tools
// mutate the project; open-world tools reach external systems (web research,
// site cloning).
const TOOL_ANNOTATIONS: Record<string, {
  title: string;
  annotations: {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
    idempotentHint?: boolean;
    openWorldHint?: boolean;
  };
}> = {
  init: { title: 'Initialize Constitution', annotations: { destructiveHint: true } },
  vision: { title: 'Expand Vision', annotations: { destructiveHint: true } },
  strategize: { title: 'Research Strategy', annotations: { destructiveHint: true, openWorldHint: true } },
  tactics: { title: 'Audit Tactics', annotations: { destructiveHint: true } },
  specify: { title: 'Generate Spec', annotations: { destructiveHint: true } },
  clarify: { title: 'Clarify Spec', annotations: { destructiveHint: true } },
  plan: { title: 'Generate Plan', annotations: { destructiveHint: true } },
  tasks: { title: 'Generate Tasks', annotations: { destructiveHint: true } },
  'next-task': { title: 'Get Next Task', annotations: { readOnlyHint: true, idempotentHint: true } },
  implement: { title: 'Implement Task', annotations: { destructiveHint: true } },
  validate: { title: 'Validate Impact', annotations: { destructiveHint: true } },
  trace: { title: 'Traceability Matrix', annotations: { readOnlyHint: true, idempotentHint: true } },
  analyze: { title: 'Analyze Consistency', annotations: { readOnlyHint: true, idempotentHint: true } },
  amend: { title: 'Amend Requirements', annotations: { destructiveHint: true } },
  e2e: { title: 'Run End-to-End', annotations: { destructiveHint: true } },
  clone: { title: 'Clone Website', annotations: { destructiveHint: true, openWorldHint: true } },
  'detect-environment': { title: 'Detect Environment', annotations: { readOnlyHint: true, idempotentHint: true } },
};

export function createVddMcpServer(): McpServer {
    const server = new McpServer({ name: 'vdd', version: '1.6.0' });

  for (const name of PHASE_NAMES) {
    const toolName = `vdd_${name.replace(/-/g, '_')}`;
    const meta = PHASE_META[name];
    const toolMeta = TOOL_ANNOTATIONS[name];
    server.registerTool(
      toolName,
      {
        title: toolMeta?.title,
        description: meta?.description ?? `VDD Phase: ${name}`,
        inputSchema: PHASE_INPUT_SCHEMAS[name],
        annotations: toolMeta?.annotations,
      },
      async (params: Record<string, unknown>) => {
        const ctx: VddContext = { projectRoot: String(params.projectRoot || '.'), mode: 'auto' };
        const input: VddPhaseInput = {
          statement: params.statement as string | undefined,
          actionItemId: params.actionItemId as string | undefined,
          feature: params.feature as string | undefined,
          taskId: params.taskId as string | undefined,
          description: params.description as string | undefined,
          availableTools: params.availableTools as string[] | undefined,
          capabilities: params.capabilities as string[] | undefined,
          researchFindings: params.researchFindings as string | undefined,
          artifactFiles: params.artifactFiles as Record<string, string> | undefined,
          maxPages: params.maxPages as number | undefined,
          timeoutMs: params.timeoutMs as number | undefined,
          concurrency: params.concurrency as number | undefined,
          crawl: params.crawl as boolean | undefined,
          browser: params.browser as boolean | undefined,
          refresh: params.refresh as boolean | undefined,
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
