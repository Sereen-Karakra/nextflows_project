import type { McpServer } from "@modelcontextprotocol/server";

const CHEATSHEET = `# Tool Schemas Cheat Sheet

## search_notes
- input: { query: string, limit?: number }
- output: { items: Note[] } | { items: [], message: string }

## list_notes
- input: {}
- output: { items: NoteSummary[], total: number, folder: string }

## add_note
- input: { title: string, category: string, content: string }
- output: { success: boolean, message: string, note: Note }
`;

export function registerNotesSchemaResource(server: McpServer): void {
  server.registerResource(
    "notes-schema-cheatsheet",
    "notes://schema",
    {
      title: "Tool Schema Cheat Sheet",
      description: "Input and output shape for each notes tool.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: CHEATSHEET,
        },
      ],
    }),
  );
}