import type { McpServer } from "@modelcontextprotocol/server";
import fs from "node:fs/promises";
import path from "node:path";

import { addNoteInputSchema } from "../schemas/add-note.js";
import { notesSchema } from "../schemas/note.js";
import { readDataFile } from "../lib/file.js";

export function registerAddNoteTool(server: McpServer): void {
  server.registerTool(
    "add_note",
    {
      description:
        "Add a new note to the local notes collection.",
      inputSchema: addNoteInputSchema,
    },
    async ({ title, category, content }) => {
      try {
        const json = await readDataFile("notes.json");
        const notes = notesSchema.parse(JSON.parse(json));

        const newNote = {
          id:
            notes.length > 0
              ? Math.max(...notes.map((note) => note.id)) + 1
              : 1,
          title,
          category,
          content,
        };

        notes.push(newNote);

        const filePath = path.resolve(process.cwd(), "data", "notes.json");

        await fs.writeFile(
          filePath,
          JSON.stringify(notes, null, 2),
          "utf-8",
        );

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
