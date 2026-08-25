import type { McpServer } from "@modelcontextprotocol/server";

import { updateNoteInputSchema } from "../schemas/update-note.js";
import { updateNote } from "../lib/notes.js";

export function registerUpdateNoteTool(server: McpServer): void {
  server.registerTool(
    "update_note",
    {
      description: "Update an existing note in the local notes collection.",
      inputSchema: updateNoteInputSchema,
    },
    async ({ id, title, category, content }) => {
      try {
        const updatedNote = await updateNote(
          id,
          title,
          category,
          content,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  message: "Note updated successfully.",
                  note: updatedNote,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        console.error("update_note:", error);

        return {
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to update note.",
            },
          ],
        };
      }
    },
  );
}