import type { McpServer } from "@modelcontextprotocol/server";

import { listNotes } from "../lib/notes.js";

export function registerNotesIndexResource(server: McpServer): void {
  server.registerResource(
    "notes-index",
    "notes://index",
    {
      title: "Notes Index",
      description: "Lightweight list of all note titles and categories.",
      mimeType: "application/json",
    },
    async (uri) => {
      const notes = await listNotes();

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(
              {
                items: notes,
                total: notes.length,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}