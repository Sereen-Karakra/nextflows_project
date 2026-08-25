# Demo Script — MCPRepo

## 0:00–0:40 — The Problem

MCPRepo is a TypeScript Notes MCP Server that gives AI assistants a simple way to work with a local notes collection.

The notes are stored locally in `data/notes.json`, and the server provides MCP tools for searching, listing, adding, updating, and deleting notes.

The main goal is to expose this structured local information to an AI assistant through MCP while keeping the core functionality offline.

---

## 0:40–1:10 — Architecture

The architecture is simple:

AI Client / MCP Inspector
→ MCP Server
→ Notes Tools and Resources
→ `data/notes.json`

The server uses the stdio transport. The tools work with the local notes data, so the core Notes functionality does not require an internet connection.

**Slide:** Architecture diagram

---

## 1:10–3:30 — Live Demo

### Live Prompt 1

**Prompt:**

> Find my notes about Git.

Expected tool:

`search_notes`

Input:

```json
{
  "query": "Git",
  "limit": 5
}
```

Show the returned matching notes.

### Live Prompt 2

**Prompt:**

> Show me the available notes.

Expected tool:

`list_notes`

Input:

```json
{
  "folder": "notes"
}
```

Show the returned note summaries.

### Backup Prompt

**Prompt:**

> Add a note about office hours, then find it.

Expected tools:

1. `add_note`
2. `search_notes`

Input for `add_note`:

```json
{
  "title": "office-hours",
  "category": "Academy",
  "content": "Mentor office hours are Wednesdays 1:30–3:30 PM."
}
```

Then search for:

```text
office-hours
```

**Backup plan:** If the live connection or Wi-Fi is unavailable, use the local fixture in `data/notes.json` and the examples in `examples/` to explain the expected tool inputs and outputs. The core Notes functionality is designed to work offline.

---

## 3:30–4:30 — What I Would Build Next

After shipping, I would explore the HTTP transport documentation to understand how the server could be deployed beyond my own machine.

I would also look at other MCP servers for ideas and create an issue on the repository describing one post-cohort improvement.

---

## 4:30–5:00 — Questions

That’s the demo. Thank you, and I’m ready for questions.
