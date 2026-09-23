# Glama build: compiles the VDD MCP server and exposes it over the MCP
# Streamable HTTP transport on port 3000. This lets Glama's sandbox run the
# standard MCP introspection exchange AND host (one-click "Deploy") the server
# as a remote streamable-HTTP connector.
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
