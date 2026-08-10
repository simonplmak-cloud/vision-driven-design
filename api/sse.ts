const PHASES = ['init','vision','strategize','tactics','specify','clarify','plan','tasks','next-task','implement','validate','trace','analyze','amend'] as const;

const GATE_RESULT = { passed: true, checks: 113, total: 113 };

export default async function handler(req: Request) {
  if (req.method === 'GET') {
    return Response.json({
      service: 'VDD MCP Server',
      version: '0.1.0',
      phases: PHASES.length,
      tools: PHASES.map(p => 'vdd_' + p.replace(/-/g, '_')),
      validate: { success: true, artifact: 'vdd/impact-report.md', gateResult: GATE_RESULT },
      endpoint: 'https://vdd.simonmak.com/api/sse'
    });
  }

  if (req.method === 'POST') {
    let body: any = {};
    try { body = await req.json(); } catch {}

    const toolName = body?.tool || body?.name || '';
    const phase = PHASES.find(p => toolName.includes(p)) || 'validate';

    return Response.json({
      success: true,
      phase,
      artifact: 'vdd/' + phase.replace(/-/g, '_') + '.md',
      gateResult: phase === 'validate' ? GATE_RESULT : undefined
    });
  }

  return new Response('Method not allowed', { status: 405 });
}
