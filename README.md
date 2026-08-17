# MCPRepo — Notes MCP Server

> A TypeScript Model Context Protocol (MCP) server built as part of the NextFlows Academy cohort **Building an MCP for an AI Engine**.

This project is a simple offline **Notes MCP Server** that allows an AI model to search, list, and add notes stored in a local JSON file.

The project demonstrates MCP tools, Zod input validation, local data access, MCP resources, security hardening, and testing through MCP Inspector.

---

## Project Overview

The Notes MCP Server provides three main P0 tools:

| Priority | Tool | Purpose |
| --- | --- | --- |
| P0 | `search_notes` | Search notes by keyword or phrase |
| P0 | `list_notes` | List available notes |
| P0 | `add_note` | Add a new note to the local collection |
| P1 | `greet` | Simple greeting tool |

The notes are stored locally in:

```text
data/notes.json
```

The current P0 tools work completely offline using local data.

---

## Prerequisites

- Node.js 20 or later
- npm
- Git
- VS Code or Cursor

Check your versions:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <YOUR_REPOSITORY_URL>
cd nextflows_project
npm install
```

---

## Running the MCP Server

Start the MCP server with:

```bash
npm start
```

You can also run:

```bash
npm run dev
```

Both commands start the server using the stdio transport.

Stop the server with `Ctrl+C`.

---

## Running MCP Inspector

The recommended way to test the project is through MCP Inspector:

```bash
npm run inspect
```

In the Inspector:

1. Open the **Tools** tab.
2. Confirm that the four tools are available.
3. Test `search_notes`.
4. Test `list_notes`.
5. Test `add_note`.
6. Test invalid input and confirm that validation rejects it.
7. Open the **Resources** tab and verify the available resources.

---

# P0 Tools

## `search_notes`

Searches the local notes collection using a keyword or phrase.

### Inputs

| Input | Type | Required | Limits |
| --- | --- | --- | --- |
| `query` | string | Yes | 1–200 characters |
| `limit` | number | No | Integer from 1–20 |

Example:

```json
{
  "query": "Git",
  "limit": 5
}
```

The tool searches note titles, categories, and content.

The number of returned results is limited according to the validated `limit`, with a default of 5.

If no notes match the query, the tool returns an empty result with a clear message.

If results are truncated, the response indicates that the output was truncated.

---

## `list_notes`

Lists the available notes in the local collection.

### Input

| Input | Type | Required | Limits |
| --- | --- | --- | --- |
| `folder` | string | No | 1–100 characters |

Example:

```json
{
  "folder": "notes"
}
```

The current implementation does not use the `folder` value to access arbitrary filesystem paths. It is returned as part of the response.

The tool returns a maximum of 10 note summaries and reports when the results are truncated.

---

## `add_note`

Adds a new note to the local notes collection.

### Inputs

| Input | Type | Required | Limits |
| --- | --- | --- | --- |
| `title` | string | Yes | 1–100 characters |
| `category` | string | Yes | 1–50 characters |
| `content` | string | Yes | 1–5000 characters |

Example:

```json
{
  "title": "Git Branches",
  "category": "Git",
  "content": "A Git branch allows developers to work on features independently."
}
```

A successful request returns the created note and its generated ID.

---

# Input Validation

Tool inputs are validated using **Zod** before the tool logic is executed.

The current P0 schemas enforce:

- Required string fields
- Minimum string lengths
- Maximum string lengths
- Integer validation for `limit`
- Minimum and maximum values for `limit`

Current limits include:

```text
search_notes.query    → 1–200 characters
search_notes.limit    → integer 1–20
add_note.title        → 1–100 characters
add_note.category     → 1–50 characters
add_note.content      → 1–5000 characters
list_notes.folder     → 1–100 characters
```

Invalid or missing required input is rejected before the corresponding tool operation is performed.

---

# Security Hardening

The Week 4 hardening work focuses on input validation, filesystem boundaries, network protection, output limits, error handling, and secret handling.

## Input Validation

Zod schemas apply minimum and maximum limits to user-controlled string inputs.

Invalid or missing required inputs are rejected with validation errors.

For example, submitting `add_note` without the required `content` field is rejected by input validation.

## Filesystem Path Protection

Local data access is restricted to the intended `data` directory.

The file helper uses `path.resolve()` and `path.relative()` and verifies that the resolved path does not escape the data directory.

Paths outside the allowed data directory are rejected.

The current P0 tools do not allow the model to directly choose an arbitrary filesystem path.

## Network Protection

The shared HTTP helper uses an explicit HTTPS hostname allowlist.

Currently allowed host:

```text
api.open-meteo.com
```

Only HTTPS URLs are accepted.

Requests to hosts outside the allowlist are rejected.

The current P0 tools do not make network requests, but the shared HTTP helper is protected before it can be used by a tool.

## Network Timeouts

Network requests use an 8-second timeout through `AbortSignal.timeout()`.

Timed-out requests return a clear timeout error instead of waiting indefinitely.

## Output Limits

The P0 note tools limit the amount of returned data.

- `search_notes` limits returned results according to the validated `limit`.
- `list_notes` returns at most 10 note summaries.
- Truncated responses include an indication that the output was capped.

## Error Handling

Tool errors returned to the model are short and actionable.

Raw stack traces are not returned as tool responses.

Examples include:

```text
Failed to add note.
Failed to search notes.
Failed to load notes.
```

---

# Secrets and Environment Variables

The current P0 tools do not require API keys or external credentials.

The repository protects environment files through `.gitignore`:

```text
.env
.env.*
!.env.example
```

A placeholder `.env.example` file is included for future configuration.

No real secrets are required by the current P0 tools.

---

# Security Testing

The Week 4 hardening was tested using MCP Inspector.

## Invalid `add_note` input

An `add_note` request was submitted without the required `content` field.

The Inspector returned an input validation error:

```text
Tool Error
Input validation error: Invalid arguments for tool add_note:
content: Invalid input: expected string, received undefined
```

This confirms that invalid input is rejected by the tool schema.

## Input length limits

The schemas enforce maximum input lengths.

The MCP Inspector reflects these limits in its input fields, preventing values beyond the configured maximum from being submitted through the UI.

## Filesystem boundary

The shared file helper resolves paths and rejects paths that escape the configured data directory.

## Network allowlist

The shared HTTP helper accepts only HTTPS requests to explicitly allowlisted hosts.

## Network timeout

Network requests are cancelled after the configured timeout.

---

# Demo Path

The recommended demo flow is:

1. Start MCP Inspector:

```bash
npm run inspect
```

2. Open the **Tools** tab.

3. Demonstrate `search_notes` using a query such as `Git`.

4. Demonstrate `list_notes` and show the available note summaries.

5. Demonstrate `add_note` with valid title, category, and content.

6. Demonstrate input validation by submitting `add_note` without the required `content` field.

7. Show that the invalid request is rejected with a validation error.

8. Open the **Resources** tab and demonstrate the available MCP resources.

This demonstrates the three P0 tools and one rejected invalid-input case.

---

# MCP Resources

The server provides three read-only MCP resources:

| URI | Purpose | Type |
| --- | --- | --- |
| `notes://faq` | Frequently asked questions about the notes tools | Markdown |
| `notes://index` | List of note titles and categories | JSON |
| `notes://schema` | Tool input/output schema cheat sheet | Markdown |

These resources can be viewed through the **Resources** tab in MCP Inspector.

---

# Project Structure

```text
nextflows_project/
├── data/
│   └── notes.json
├── docs/
│   ├── PROGRAM.md
│   ├── CURRICULUM.md
│   ├── WEEK-2.md
│   ├── project-choice.md
│   ├── design.md
│   ├── threat-model.md
│   └── week-4-threat-model.md
├── src/
│   ├── index.ts
│   ├── lib/
│   │   ├── file.ts
│   │   ├── http.ts
│   │   └── notes.ts
│   ├── resources/
│   │   ├── notes-faq.ts
│   │   ├── notes-index.ts
│   │   └── notes-schema.ts
│   ├── schemas/
│   │   ├── add-note.ts
│   │   ├── greet.ts
│   │   ├── list-notes.ts
│   │   ├── note.ts
│   │   └── search-notes.ts
│   └── tools/
│       ├── add-note.ts
│       ├── greet.ts
│       ├── list-notes.ts
│       └── search-notes.ts
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── SECURITY.md
```

---

# Project Documentation

Important documentation includes:

- `docs/design.md` — Project design and tool inventory
- `docs/threat-model.md` — Initial threat model
- `docs/week-4-threat-model.md` — Week 4 security threat model
- `docs/PROGRAM.md` — NextFlows Academy program
- `docs/CURRICULUM.md` — Six-week curriculum

---

# NPM Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the MCP server |
| `npm run dev` | Start the MCP server in development |
| `npm run inspect` | Start MCP Inspector with the server |
| `npm test` | Run the automated smoke tests for the pure note-filtering helper |

---

# Technology Stack

- TypeScript
- Node.js 20+
- `@modelcontextprotocol/server`
- Zod
- `tsx`
- MCP Inspector
- stdio transport
- Local JSON data

---

# NextFlows Academy

This project is part of the **NextFlows Academy — Building an MCP for an AI Engine** cohort.

Program hub:

https://nextflows.ai/academy

---

# License

MIT