import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/server';
import { createVddMcpServer } from './server.js';

const PORT = Number(process.env.PORT ?? 3000);

// Streamable-HTTP entrypoint. Exposes the same 16 VDD MCP tools over the MCP
// Streamable HTTP transport so any remote client can connect on a TCP port —
// used when self-hosting the server. (Glama builds its own container from the
// stdio entrypoint; it does not use this one.)
export async function startHttpServer(): Promise<void> {
  const mcpServer = createVddMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });
  await mcpServer.connect(transport);

  const httpServer = http.createServer(async (req, res) => {
    try {
      const host = req.headers.host ?? 'localhost';
      const url = new URL(req.url ?? '/', `http://${host}`);

      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value === undefined) continue;
        headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }

      let body: string | undefined;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        body = Buffer.concat(chunks).toString('utf8');
      }

      const request = new Request(url, {
        method: req.method ?? 'GET',
        headers,
        body,
      });

      const response = await transport.handleRequest(request);

      res.statusCode = response.status;
      for (const [key, value] of response.headers.entries()) {
        res.setHeader(key, value);
      }

      if (response.body) {
        const reader = response.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      }
      res.end();
    } catch (error) {
      res.statusCode = 500;
      res.end(String(error));
    }
  });

  await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
}
