import type { McpServer } from "@modelcontextprotocol/server";

import { addNoteInputSchema } from "../schemas/add-note.js";
import { addNote } from "../lib/notes.js";


export function registerAddNoteTool(server: McpServer): void {
  server.registerTool(
    "add_note",
    {
      description: "Add a new note to the local notes collection.",
      inputSchema: addNoteInputSchema,
    },
    async ({ title, category, content }) => {
      try {
        const newNote = await addNote(title, category, content);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  message: "Note added successfully.",
                  note: newNote,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        console.error("add_note:", error);

        return {
          content: [
            {
              type: "text",
              text: "Failed to add note.",
            },
          ],
        };
      }
    },
  );
}
