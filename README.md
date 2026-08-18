# MCPRepo — Notes MCP Server

## What it does

MCPRepo is a TypeScript Model Context Protocol (MCP) server for working with a small local notes collection.

The server provides tools for:

- Searching notes by keyword or phrase.
- Listing available notes.
- Adding new notes.

Notes are stored locally in:

```text
data/notes.json
```

The P0 Notes tools use local data and do not require an internet connection.

---

## Requirements

Before running the project, install:

- Node.js 20 or later
- npm
- Git

Check your installed versions:

```bash
node -v
npm -v
```

---

## Install

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/Sereen-Karakra/nextflows_project.git
cd nextflows_project
npm install
```

---

## Run

Start the MCP server from the project root:

```bash
npm start
```

The server uses the stdio transport.

You can stop the server with:

```text
Ctrl+C
```

For development, you can also use:

```bash
npm run dev
```

---

## MCP Inspector

MCP Inspector provides the easiest way to connect to and test the server.

From the project root, run:

```bash
npm run inspect
```

Then:

1. Open the **Tools** tab.
2. Confirm that `search_notes`, `list_notes`, and `add_note` are available.
3. Select a tool.
4. Enter the required input.
5. Run the tool and inspect the response.

The server also exposes read-only MCP resources that can be viewed from the **Resources** tab.

---

## Tools

| Tool | Purpose | Main input |
| --- | --- | --- |
| `search_notes` | Search local notes by title, category, or content. | `query`, optional `limit` |
| `list_notes` | List available note summaries. | optional `folder` |
| `add_note` | Add a new note to the local notes collection. | `title`, `category`, `content` |

### `search_notes`

Searches note titles, categories, and content.

Example input:

```json
{
  "query": "Git",
  "limit": 5
}
```

Input limits:

- `query`: 1–200 characters
- `limit`: integer from 1–20

If no notes match the query, the tool returns an empty result with a clear message.

### `list_notes`

Lists available note summaries.

Example input:

```json
{
  "folder": "notes"
}
```

Input limit:

- `folder`: optional string, 1–100 characters when provided

The tool returns at most 10 note summaries and indicates when results are truncated.

### `add_note`

Creates a new note in the local notes collection.

Example input:

```json
{
  "title": "Git Branches",
  "category": "Git",
  "content": "A Git branch allows developers to work on features independently."
}
```

Input limits:

- `title`: 1–100 characters
- `category`: 1–50 characters
- `content`: 1–5000 characters

A successful request returns the created note and its generated ID.

---

## Example prompts

If you are using an AI client connected to the MCP server, examples include:

```text
Search my notes for Git.
```

```text
List the available notes.
```

```text
Find notes related to MCP.
```

```text
Add a note titled "Git Branches" in the "Git" category with content about working with branches.
```

You can also test the same operations directly through MCP Inspector.

For more complete examples of using the Notes MCP Server with a model, see [Example Conversations](examples/conversations.md).

---

## Troubleshooting

### 1. `npm` or `node` is not recognized

Make sure Node.js 20 or later is installed and available in your system PATH.

Check with:

```bash
node -v
npm -v
```

If either command is not recognized, install Node.js and reopen the terminal before trying again.

---

### 2. MCP Inspector does not connect to the server

Make sure you are running the command from the project root:

```bash
npm run inspect
```

If the Inspector was already running, stop it with `Ctrl+C` and start it again.

Also make sure the project dependencies have been installed:

```bash
npm install
```

---

### 3. A tool rejects the input

The Notes tools validate their inputs before running.

Check the required fields and their limits:

- `search_notes`: `query` is required; `limit` must be an integer from 1–20.
- `list_notes`: `folder` is optional, but if provided it must be a non-empty string up to 100 characters.
- `add_note`: `title`, `category`, and `content` are required and must stay within their configured limits.

For example, a valid `search_notes` request is:

```json
{
  "query": "Git",
  "limit": 5
}
```

---

## License

MIT
