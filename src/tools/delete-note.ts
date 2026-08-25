import type { McpServer } from "@modelcontextprotocol/server";

import { deleteNoteInputSchema } from "../schemas/delete-note.js";
import { deleteNote } from "../lib/notes.js";

export function registerDeleteNoteTool(server: McpServer): void {
  server.registerTool(
    "delete_note",
    {
      description: "Delete an existing note from the local notes collection.",
      inputSchema: deleteNoteInputSchema,
    },
    async ({ id }) => {
      try {
        const deletedNote = await deleteNote(id);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  message: "Note deleted successfully.",
                  note: deletedNote,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        console.error("delete_note:", error);

        return {
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to delete note.",
            },
          ],
        };
      }
    },
  );
}