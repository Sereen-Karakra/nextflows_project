import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js";
import { registerSearchNotesTool } from "./tools/search-notes.js";
import { registerListNotesTool } from "./tools/list-notes.js";
import { registerAddNoteTool } from "./tools/add-note.js";

/**
 * Factory used by stdio (and later HTTP) so every connection gets a fresh server.
 * Register all tools inside this function — never on a shared global instance.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "notes-faq-search-mcp",
    version: "0.2.0",
  });

  registerGreetTool(server);
  registerSearchNotesTool(server);
  registerListNotesTool(server);
  registerAddNoteTool(server);

  return server;
}

void serveStdio(createServer);
console.error("notes-faq-search-mcp MCP server running on stdio");