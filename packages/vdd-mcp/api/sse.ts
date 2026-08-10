import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';

const PHASES = ['init','vision','strategize','tactics','specify','clarify','plan','tasks','next-task','implement','validate','trace','analyze','amend'] as const;

function createServer(): McpServer {
  const server = new McpServer({ name: 'vdd', version: '0.1.0' });
  for (const name of PHASES) {
    server.registerTool(
      `vdd_${name.replace(/-/g, '_')}`,
      {
        description: `VDD Phase: ${name}`,
        inputSchema: {
          statement: z.string().optional(),
          projectRoot: z.string().optional(),
          feature: z.string().optional(),
          taskId: z.string().optional(),
          description: z.string().optional(),
        },
      },
      async () => ({ content: [{ type: 'text' as const, text: JSON.stringify({ success: true, phase: name }) }] })
    );
  }
  return server;
}

export default async function handler(req: Request) {
  if (req.method === 'GET') {
    return new Response(JSON.stringify({
      service: 'VDD MCP Server',
      version: '0.1.0',
      phases: PHASES.length,
      tools: PHASES.map(p => `vdd_${p.replace(/-/g, '_')}`),
      endpoint: 'https://vdd.simonmak.com/api/sse'
    }), { headers: { 'Content-Type': 'application/json' } });
  }
  return new Response('Method not allowed', { status: 405 });
}
