import type { McpServer } from "@modelcontextprotocol/server";

import { searchNotesInputSchema } from "../schemas/search-notes.js";
import { searchNotes } from "../lib/notes.js";
export function registerSearchNotesTool(server: McpServer): void {
  server.registerTool(
    "search_notes",
    {
      description:
        "Search local notes by keyword and return matching notes.",
      inputSchema: searchNotesInputSchema,
    },
    async ({ query, limit }) => {
      try {
       const results = (await searchNotes(query)).slice(0, limit ?? 5);

        if (results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    items: [],
                    message: "No matching notes found.",
                  },
                  null,
                  2,
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  items: results,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        console.error("search_notes:", error);

        return {
          content: [
            {
              type: "text",
              text: "Failed to search notes.",
            },
          ],
        };
      }
    },
  );
}