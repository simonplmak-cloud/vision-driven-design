import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import { PHASES, type VddContext, type VddPhaseInput } from '@vdd/engine';

const PHASE_NAMES = ['init','vision','strategize','tactics','specify','clarify','plan','tasks','next-task','implement','validate','trace','analyze','amend'] as const;

export function createVddMcpServer(): McpServer {
  const server = new McpServer({ name: 'vdd', version: '0.1.0' });

  for (const name of PHASE_NAMES) {
    const toolName = `vdd_${name.replace(/-/g, '_')}`;
    server.registerTool(
      toolName,
      {
        description: `VDD Phase: ${name}`,
        inputSchema: {
          statement: z.string().optional().describe('Freeform input'),
          projectRoot: z.string().default('.').describe('Project root'),
          actionItemId: z.string().optional(),
          feature: z.string().optional(),
          taskId: z.string().optional(),
          description: z.string().optional(),
          json: z.boolean().default(false),
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
          json: Boolean(params.json),
        };
        const result = await PHASES[name](input, ctx);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result) }] };
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
