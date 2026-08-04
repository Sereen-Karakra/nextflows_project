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
                  items: notes.slice(0, 10),
                  total: notes.length,
                  folder: folder ?? "notes",
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