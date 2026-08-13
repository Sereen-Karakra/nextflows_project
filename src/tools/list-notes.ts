import type { McpServer } from "@modelcontextprotocol/server";

import { listNotesInputSchema } from "../schemas/list-notes.js";
import { listNotes } from "../lib/notes.js";

export function registerListNotesTool(server: McpServer): void {
  server.registerTool(
    "list_notes",
    {
      description:
        "List available local note and FAQ files the model can search or open.",
      inputSchema: listNotesInputSchema,
    },
    async ({ folder }) => {
      try {
        const notes = await listNotes();
        const maxItems = 10;
        const items = notes.slice(0, maxItems);
        const truncated = notes.length > maxItems;

        if (notes.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    items: [],
                    message: "No notes found.",
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
                  items,
                  total: notes.length,
                  truncated,
                  folder: folder ?? "notes",
                  ...(truncated
                    ? {
                        message: `Results truncated to ${maxItems} items.`,
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
        console.error("list_notes:", error);

        return {
          content: [
            {
              type: "text",
              text: "Failed to load notes.",
            },
          ],
        };
      }
    },
  );
}