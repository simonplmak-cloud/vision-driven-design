# Glama-only build: compiles the VDD stdio MCP server and exposes it over stdio
# so Glama's sandbox can run the standard MCP introspection exchange.
#
# The monorepo's hosted endpoint (api/sse.js) is a Vercel SSE server; this image
# instead builds the local stdio server at packages/vdd-mcp/dist/stdio.js.
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

# Run the stdio MCP server. No environment variables or network access required.
CMD ["node", "packages/vdd-mcp/dist/stdio.js"]
