import type { McpServer } from "@modelcontextprotocol/server";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const FAQ_PATH = fileURLToPath(
  new URL("../../docs/FAQ.md", import.meta.url),
);

export function registerNotesFaqResource(server: McpServer): void {
  server.registerResource(
    "notes-faq",
    "notes://faq",
    {
      title: "Notes FAQ",
      description: "Frequently asked questions about using the notes tools.",
      mimeType: "text/markdown",
    },
    async (uri) => {
      const text = await readFile(FAQ_PATH, "utf-8");

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/markdown",
            text,
          },
        ],
      };
    },
  );
}