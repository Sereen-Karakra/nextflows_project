# Design doc — Week 2

> Mandatory for mentor review. Open a GitHub Issue linking to this file before Week 3.

**Student:** Nagham Halloum & Sereen Karakra  
**Repo:** https://github.com/Sereen-Karakra/nextflows_project  
**Branch:** week-3-data  
**GitHub Issue:** https://github.com/Sereen-Karakra/nextflows_project/issues/2

---

## 1. Pitch

The project is a Notes MCP Server that allows AI models to search, list, and add notes stored in a local JSON file. It provides a simple offline knowledge base that demonstrates how MCP tools and resources can expose structured information to AI assistants.

## 2. Demo Day user story

1. The MCP Inspector starts and connects to the server.
2. The user asks to search for notes about Git.
3. The model calls the `search_notes` tool and retrieves matching notes.
4. The audience sees the returned results, lists available notes, adds a new note, and reads documentation through MCP Resources.

## 3. Tool inventory (4–7 tools)

| Priority | Tool name | Description | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| P0 | search_notes | Search notes by keyword | query, limit | Matching notes |
| P0 | list_notes | List available notes | folder (optional) | Note summaries |
| P0 | add_note | Add a new note | title, category, content | Success message and created note |
| P1 | greet | Simple greeting tool | name | Greeting message |

## 4. Out of scope

- Authentication
- External paid APIs
- Mobile or web user interface

## 5. Success criteria

- [x] Three P0 tools work with real data.
- [x] Resources are available and readable in MCP Inspector.
- [x] Project works completely offline using local fixtures.

## 6. Top risks

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Invalid JSON data | Medium | Validate using Zod schemas |
| Missing data file | Low | Return friendly error message |
| Unexpected tool input | Medium | Validate inputs before processing |

## 7. Evidence for Week 2

- [x] `docs/project-choice.md` filled
- [x] ≥3 Zod schemas under `src/schemas/`
- [x] Tools registered
- [x] `examples/<tool>.json` for each registered tool
- [x] Inspector screenshots attached to the GitHub Issue

---

## 8. Resources (Week 3.5)

The project exposes three read-only MCP resources that provide useful context without requiring a tool call.

| URI | Purpose | Type |
|------|---------|------|
| `notes://faq` | Frequently asked questions | Static Markdown |
| `notes://index` | Read-only list of note titles and categories | Dynamic JSON |
| `notes://schema` | Tool input/output schema cheat sheet | Static Markdown |

## Mentor decision

- Status: Pending
- Comments: