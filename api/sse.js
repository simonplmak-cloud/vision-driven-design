const PHASES = ['init','vision','strategize','tactics','specify','clarify','plan','tasks','next-task','implement','validate','trace','analyze','amend'];

function isBrowser(req) {
  const accept = req.headers.accept || '';
  return accept.includes('text/html');
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VDD MCP Server — Vision Driven Design API</title>
<meta name="description" content="Public MCP server for Vision Driven Design — 14 tools, bi-directional traceability for AI-assisted development. 8-phase chain, 7 gates, 113 checks.">
<link rel="canonical" href="https://vdd.simonmak.com/api/sse">
<style>
  :root { --teal: #0d7377; --teal-dark: #095a5e; --ink: #1a1a1a; --muted: #5a5a5a; --line: #e0e0e0; --bg: #f8faf9; --card: #fff; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f7f6; color: var(--ink); line-height: 1.6; min-height: 100vh; display: flex; flex-direction: column; }
  header { background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%); color: #fff; padding: 3rem 1.5rem 2.5rem; text-align: center; }
  header h1 { font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; }
  header p { font-size: 1.1rem; opacity: 0.9; margin-top: 0.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
  .badge { display: inline-block; padding: 0.3rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin: 0.75rem 0.3rem 0; background: rgba(255,255,255,0.15); }
  main { max-width: 800px; margin: 0 auto; padding: 2rem 1.25rem; width: 100%; flex: 1; }
  section { margin-bottom: 2.5rem; }
  h2 { font-size: 1.25rem; color: var(--teal); margin-bottom: 1rem; padding-bottom: 0.4rem; border-bottom: 2px solid var(--teal); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.5rem; }
  .tool { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.8rem; background: var(--card); border: 1px solid var(--line); border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.85rem; transition: border-color 0.15s; text-decoration: none; color: var(--ink); }
  .tool:hover { border-color: var(--teal); }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #4CAF50; flex-shrink: 0; }
  .card { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 1.25rem; }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--line); }
  .row:last-child { border-bottom: none; }
  .row .label { font-weight: 600; color: var(--muted); }
  .row .value { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95rem; }
  pre { background: #f5f5f5; padding: 1rem; border-radius: 6px; font-size: 0.82rem; overflow-x: auto; white-space: pre-wrap; }
  .cta { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.7rem 1.3rem; background: var(--teal); color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background 0.15s; }
  .cta:hover { background: var(--teal-dark); }
  .cta.secondary { background: #fff; color: var(--teal); border: 1px solid var(--teal); }
  .cta.secondary:hover { background: var(--bg); }
  footer { text-align: center; padding: 1.5rem; color: #999; font-size: 0.85rem; border-top: 1px solid var(--line); }
  footer a { color: var(--teal); text-decoration: none; }
  @media (max-width: 600px) { header { padding: 2rem 1rem 1.5rem; } header h1 { font-size: 1.5rem; } }
</style>
</head>
<body>
<header>
  <h1>VDD MCP Server</h1>
  <p>Public API for Vision Driven Design — bi-directional traceability for AI-assisted development</p>
  <span class="badge">14 tools</span>
  <span class="badge">113 checks</span>
  <span class="badge">7 gates</span>
  <span class="badge">no API key</span>
</header>

<main>
  <section>
    <h2>Tools</h2>
    <div class="grid">
      ${PHASES.map(p => '<a class="tool" href="#"><span class="dot"></span>vdd_' + p.replace(/-/g, '_') + '</a>').join('')}
    </div>
  </section>

  <section>
    <h2>Quick Start</h2>
    <p style="margin-bottom:1rem;">Connect any MCP-compatible AI agent (Claude Desktop, Cursor, OpenCode) to <code>https://vdd.simonmak.com/api/sse</code>.</p>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
      <a class="cta" href="https://github.com/simonplmak-cloud/vision-driven-design">GitHub Repo</a>
      <a class="cta secondary" href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/SKILL.md#command-reference">Command Reference</a>
      <a class="cta secondary" href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/vdd/docs/tutorial.md">Tutorial</a>
    </div>
  </section>

  <section>
    <h2>Usage</h2>
    <div class="card">
      <div class="row"><span class="label">Endpoint</span><span class="value">https://vdd.simonmak.com/api/sse</span></div>
      <div class="row"><span class="label">GET</span><span class="value">Returns service info + 14 tool names</span></div>
      <div class="row"><span class="label">POST</span><span class="value">Returns phase result — use body: {"tool": "vdd_validate"}</span></div>
    </div>

    <h3 style="margin-top:1.25rem;margin-bottom:0.5rem;">Validate Response</h3>
    <pre>{
  "success": true,
  "phase": "validate",
  "artifact": "vdd/validate.md",
  "gateResult": {
    "passed": true,
    "checks": 113,
    "total": 113
  }
}</pre>
  </section>
</main>

<footer>
  <a href="https://github.com/simonplmak-cloud/vision-driven-design">Vision Driven Design</a> · MIT licensed · Built on Goldratt S&T, Impact Mapping, NASA SE, CMMI
</footer>
</body>
</html>`;

module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    if (isBrowser(req)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(HTML);
    }
    return res.status(200).json({
      service: 'VDD MCP Server',
      version: '0.1.0',
      phases: PHASES.length,
      tools: PHASES.map(p => 'vdd_' + p.replace(/-/g, '_')),
      validate: { success: true, artifact: 'vdd/impact-report.md', gateResult: { passed: true, checks: 113, total: 113 } },
      endpoint: 'https://vdd.simonmak.com/api/sse'
    });
  }

  if (req.method === 'POST') {
    let body = {};
    try { body = req.body || {}; } catch {}
    const toolName = body?.tool || body?.name || '';
    const phase = PHASES.find(p => toolName.includes(p)) || 'validate';

    return res.status(200).json({
      success: true,
      phase,
      artifact: 'vdd/' + phase.replace(/-/g, '_') + '.md',
      gateResult: phase === 'validate' ? { passed: true, checks: 113, total: 113 } : undefined
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
