# VDD MCP server — Streamable HTTP transport on port 3000.
#
# Builds the TypeScript monorepo and serves the 17 VDD tools over the MCP
# Streamable HTTP transport, so Glama (or any remote client) can introspect it
# and host it as a one-click "Deploy" connector.
#
# The stdio entrypoint (packages/vdd-mcp/dist/stdio.js) remains available for
# local `npx @simonmak-ascent/mcp` use; this image runs the HTTP transport.
FROM node:22-alpine

# Install pnpm (workspace installs require it).
RUN npm install -g pnpm@10.30.3

WORKDIR /app

# Copy only what the TypeScript build needs. `--ignore-scripts` skips Playwright's
# browser download (an engine devDependency used for tests, not for compiling).
COPY pnpm-workspace.yaml package.json ./
COPY packages ./packages

RUN pnpm install --no-frozen-lockfile --ignore-scripts

# Build all workspace packages in topological order (engine → cli → mcp).
RUN pnpm -r build

# Run the streamable-HTTP MCP server. No environment variables or network
# access required. Port is configurable via $PORT (default 3000).
EXPOSE 3000
CMD ["node", "packages/vdd-mcp/dist/http-entry.js"]
