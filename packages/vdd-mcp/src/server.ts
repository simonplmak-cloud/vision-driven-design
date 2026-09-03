import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import { PHASES, PHASE_NAMES, PHASE_META, type VddContext, type VddPhaseInput } from '@simonmak-ascent/engine';

const INPUT_SCHEMA = {
  statement: z.string().optional().describe('Freeform input (required for vision)'),
  projectRoot: z.string().default('.').describe('Path to project root directory'),
  actionItemId: z.string().optional().describe('Tactical action item ID (e.g., "A-001")'),
  feature: z.string().optional().describe('Feature name (spec directory name)'),
  taskId: z.string().optional().describe('Task ID to implement (e.g., "TASK-003")'),
  description: z.string().optional().describe('Freeform description input'),
  availableTools: z.array(z.string()).optional().describe('MCP/tool names available to the host agent (e.g., ["brave-search","perplexity","context7","gh_grep","playwright","filesystem"])'),
  capabilities: z.array(z.string()).optional().describe('Alias for availableTools'),
  researchFindings: z.string().optional().describe('Consolidated research subagent findings to synthesize into strategy.md'),
  artifactFiles: z.record(z.string(), z.string()).optional().describe('Map of artifact path → content for serverless validate/drift detection'),
};

export function createVddMcpServer(): McpServer {
  const server = new McpServer({ name: 'vdd', version: '1.5.6' });

  for (const name of PHASE_NAMES) {
    const toolName = `vdd_${name.replace(/-/g, '_')}`;
    const meta = PHASE_META[name];
    server.registerTool(
      toolName,
      {
        description: meta?.description ?? `VDD Phase: ${name}`,
        inputSchema: INPUT_SCHEMA,
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
