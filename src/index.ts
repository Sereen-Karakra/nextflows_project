import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js";
import { registerSearchNotesTool } from "./tools/search-notes.js";
import { registerListNotesTool } from "./tools/list-notes.js";
import { registerAddNoteTool } from "./tools/add-note.js";

import { registerNotesFaqResource } from "./resources/notes-faq.js";
import { registerNotesIndexResource } from "./resources/notes-index.js";
import { registerNotesSchemaResource } from "./resources/notes-schema.js";

/**
 * Factory used by stdio (and later HTTP) so every connection gets a fresh server.
 * Register all tools and resources inside this function.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "mcprepo",
    version: "0.1.0",
  });

  // Tools
  registerGreetTool(server);
  registerSearchNotesTool(server);
  registerListNotesTool(server);
  registerAddNoteTool(server);

  // Week 3.5 — Resources
  registerNotesFaqResource(server);
  registerNotesIndexResource(server);
  registerNotesSchemaResource(server);

  return server;
}

void serveStdio(createServer);
console.error("mcprepo MCP server running on stdio");