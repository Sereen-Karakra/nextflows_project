import type { McpServer } from "@modelcontextprotocol/server";

import { searchNotesInputSchema } from "../schemas/search-notes.js";
import { notesSchema } from "../schemas/note.js";
import { readDataFile } from "../lib/file.js";

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
        const json = await readDataFile("notes.json");
        const notes = notesSchema.parse(JSON.parse(json));

        const keyword = query.toLowerCase();

        const results = notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(keyword) ||
              note.category.toLowerCase().includes(keyword) ||
              note.content.toLowerCase().includes(keyword),
          )
          .slice(0, limit ?? 5);

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