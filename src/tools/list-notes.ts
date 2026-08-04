import type { McpServer } from "@modelcontextprotocol/server";

import { listNotesInputSchema } from "../schemas/list-notes.js";
import { notesSchema } from "../schemas/note.js";
import { readDataFile } from "../lib/file.js";

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
        const json = await readDataFile("notes.json");
        const notes = notesSchema.parse(JSON.parse(json));

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
                  items: notes.map((note) => ({
                    id: note.id,
                    title: note.title,
                    category: note.category,
                  })),
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