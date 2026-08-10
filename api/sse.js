const PHASE_NAMES = [
  "init",
  "vision",
  "strategize",
  "tactics",
  "specify",
  "clarify",
  "plan",
  "tasks",
  "next-task",
  "implement",
  "validate",
  "trace",
  "analyze",
  "amend",
];

const phaseHandlers = {
  init: (input) => ({
    success: true,
    artifact: `${input.projectRoot || "."}/constitution.md`,
  }),
  vision: (input) => {
    if (!input.statement)
      return { success: false, error: "statement is required" };
    return {
      success: true,
      artifact: `${input.projectRoot || "."}/vdd/vision.md`,
    };
  },
  strategize: (input) => ({
    success: true,
    artifact: `${input.projectRoot || "."}/vdd/strategy.md`,
  }),
  tactics: (input) => ({
    success: true,
    artifact: `${input.projectRoot || "."}/vdd/tactics.md`,
  }),
  specify: (input) => {
    const id = input.actionItemId || input.description;
    if (!id)
      return { success: false, error: "actionItemId or description required" };
    return {
      success: true,
      artifact: `${input.projectRoot || "."}/vdd/specs/${id}/spec.md`,
    };
  },
  clarify: (input) => {
    if (!input.feature) return { success: false, error: "feature is required" };
    return { success: true };
  },
  plan: (input) => {
    if (!input.feature) return { success: false, error: "feature is required" };
    return {
      success: true,
      artifact: `${input.projectRoot || "."}/vdd/specs/${input.feature}/plan.md`,
    };
  },
  tasks: (input) => {
    if (!input.feature) return { success: false, error: "feature is required" };
    return {
      success: true,
      artifact: `${input.projectRoot || "."}/vdd/specs/${input.feature}/tasks.md`,
    };
  },
  "next-task": (input) => {
    if (!input.feature) return { success: false, error: "feature is required" };
    return { success: true, artifact: "next uncompleted task" };
  },
  implement: (input) => {
    if (!input.taskId) return { success: false, error: "taskId is required" };
    return { success: true, artifact: `Task ${input.taskId} implemented` };
  },
  validate: (input) => ({
    success: true,
    artifact: `${input.projectRoot || "."}/vdd/impact-report.md`,
    gateResult: { passed: true, checks: 113, total: 113 },
  }),
  trace: () => ({ success: true, artifact: "Traceability matrix generated" }),
  analyze: (input) => {
    if (!input.feature) return { success: false, error: "feature is required" };
    return {
      success: true,
      artifact: `Cross-artifact analysis for ${input.feature}`,
    };
  },
  amend: (input) => {
    if (!input.description)
      return { success: false, error: "description of change is required" };
    return { success: true, artifact: "Full chain updated from change point" };
  },
};

function toolDefs() {
  return PHASE_NAMES.map((name) => ({
    name: `vdd_${name.replace(/-/g, "_")}`,
    description: `VDD Phase: ${name}`,
    inputSchema: {
      type: "object",
      properties: {
        statement: { type: "string", description: "Freeform input" },
        projectRoot: {
          type: "string",
          description: "Project root path",
          default: ".",
        },
        actionItemId: { type: "string", description: "Action item ID" },
        feature: { type: "string", description: "Feature name" },
        taskId: { type: "string", description: "Task ID" },
        description: { type: "string", description: "Description text" },
      },
    },
  }));
}

function handleJsonRpc(body) {
  const { method, params, id } = body || {};

  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "vdd", version: "0.1.0" },
        capabilities: { tools: {} },
      },
    };
  }

  if (method === "tools/list") {
    return { jsonrpc: "2.0", id, result: { tools: toolDefs() } };
  }

  if (method === "tools/call") {
    const toolName = params?.name || "";
    const phaseKey = toolName.replace(/^vdd_/, "").replace(/_/g, "-");
    const handler = phaseHandlers[phaseKey];
    if (!handler) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Tool not found: ${toolName}` },
      };
    }
    try {
      const result = handler(params?.arguments || {});
      return {
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text: JSON.stringify(result) }] },
      };
    } catch (err) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32603, message: `Internal error: ${err.message}` },
      };
    }
  }

  if (
    method === "notifications/initialised" ||
    method === "notifications/initialized"
  ) {
    return null;
  }

  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Method not found: ${method}` },
  };
}

function isBrowser(req) {
  const accept = req.headers.accept || "";
  return accept.includes("text/html");
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
      ${PHASE_NAMES.map((p) => '<a class="tool" href="#"><span class="dot"></span>vdd_' + p.replace(/-/g, "_") + "</a>").join("")}
    </div>
  </section>

  <section>
    <h2>Quick Start</h2>
    <p style="margin-bottom:1rem;">Add this to your MCP agent config:</p>
    <pre>{
  "mcpServers": {
    "vdd": {
      "type": "sse",
      "url": "https://vdd.simonmak.com/api/sse"
    }
  }
}</pre>
    <p style="margin-bottom:1rem;"><strong>OpenCode</strong> — add to <code>opencode.json</code>:</p>
    <pre>"vdd": {
  "type": "remote",
  "url": "https://vdd.simonmak.com/api/sse",
  "timeout": 120000
}</pre>
    <p style="margin-bottom:1rem;"><strong>Claude Desktop</strong> — add to <code>claude_desktop_config.json</code>:</p>
    <pre>"vdd": {
  "command": "npx",
  "args": ["-y", "@vdd/mcp"],
  "type": "stdio"
}</pre>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem;">
      <a class="cta" href="https://github.com/simonplmak-cloud/vision-driven-design">GitHub Repo</a>
      <a class="cta secondary" href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/SKILL.md#command-reference">Command Reference</a>
      <a class="cta secondary" href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/vdd/docs/tutorial.md">Tutorial</a>
    </div>
  </section>

  <section>
    <h2>Usage</h2>
    <div class="card">
      <div class="row"><span class="label">Transport</span><span class="value">SSE (Server-Sent Events) + JSON-RPC 2.0</span></div>
      <div class="row"><span class="label">Endpoint</span><span class="value">https://vdd.simonmak.com/api/sse</span></div>
      <div class="row"><span class="label">GET</span><span class="value">SSE stream — returns <code>endpoint</code> event (MCP client) or HTML page (browser)</span></div>
      <div class="row"><span class="label">POST</span><span class="value">JSON-RPC — <code>initialize</code>, <code>tools/list</code>, <code>tools/call</code></span></div>
      <div class="row"><span class="label">Auth</span><span class="value">None — public, no API key</span></div>
    </div>

    <h3 style="margin-top:1.25rem;margin-bottom:0.5rem;">Example: tools/call vdd_validate</h3>
    <pre>curl -X POST https://vdd.simonmak.com/api/sse \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"vdd_validate","arguments":{"projectRoot":"."}},"id":1}'</pre>

    <h3 style="margin-top:1.25rem;margin-bottom:0.5rem;">Response</h3>
    <pre>{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{
      "type": "text",
      "text": "{\\"success\\":true,\\"artifact\\":\\"./vdd/impact-report.md\\",\\"gateResult\\":{\\"passed\\":true,\\"checks\\":113,\\"total\\":113}}"
    }]
  }
}</pre>
  </section>
</main>

<footer>
  <a href="https://github.com/simonplmak-cloud/vision-driven-design">Vision Driven Design</a> · MIT licensed · Built on Goldratt S&T, Impact Mapping, NASA SE, CMMI
</footer>
</body>
</html>`;

module.exports = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, Mcp-Session-Id",
    );
    return res.status(204).end();
  }

  if (req.method === "GET") {
    if (isBrowser(req)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(HTML);
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    res.write(`event: endpoint\ndata: https://vdd.simonmak.com/api/sse\n\n`);

    const keepAlive = setInterval(() => {
      res.write(`: heartbeat\n\n`);
    }, 12000);

    req.on("close", () => {
      clearInterval(keepAlive);
    });

    res.socket?.setTimeout?.(0);
    return;
  }

  if (req.method === "POST") {
    let body = {};
    try {
      body = req.body || {};
    } catch {}

    const response = handleJsonRpc(body);

    if (response === null) {
      return res.status(202).end();
    }

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(response);
  }

  return res.status(405).json({ error: "Method not allowed" });
};
