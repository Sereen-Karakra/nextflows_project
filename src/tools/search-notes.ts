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
        const allResults = await searchNotes(query);
        const maxResults = limit ?? 5;
        const results = allResults.slice(0, maxResults);
        const truncated = allResults.length > maxResults;

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
                  total: allResults.length,
                  truncated,
                  ...(truncated
                    ? {
                        message: `Results truncated to ${maxResults} items.`,
                      }
                    : {}),
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