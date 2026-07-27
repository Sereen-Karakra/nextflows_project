# Design doc — Week 2

> Mandatory for mentor review. Open a GitHub Issue linking to this file before Week 3.

**Students:** Nagham Halloum, Sereen Karakra  
**Repo:** https://github.com/Sereen-Karakra/nextflows_project  
**Branch:** `week-2-design`  
**GitHub Issue:**  

---

## 1. Pitch

Notes & FAQ Search is an MCP server designed to help students quickly search through notes and frequently asked questions. Instead of manually browsing documents, users can ask questions in natural language and receive relevant answers. The MCP exposes simple tools for searching notes, listing available notes, and adding new notes, making information easier to access during conversations.

---

## 2. Demo Day user story

1. The mentor starts the MCP Inspector and connects to the Notes & FAQ Search MCP server.
2. The user asks: "Can you find notes about Git branches?"
3. The model calls the `search_notes` tool to search for matching notes. If needed, it can call `list_notes` to show the available notes.
4. The audience sees the matching note returned with a useful answer, demonstrating how the MCP server helps retrieve information quickly.

---

## 3. Tool inventory (4–7 tools)

Mark exactly **three** tools as **P0** (must work for Demo Day). Others can be P1 stubs.

| Priority | Tool name (`verb_noun`) | Description (for the model) | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| P0 | `search_notes` | Search notes using keywords and return matching results. | keyword | Matching notes |
| P0 | `list_notes` | Return a list of all available notes. | None | List of note titles |
| P0 | `add_note` | Add a new note to the collection. | title, content | Success message |
| P1 | `update_note` | Update an existing note. | title, new content | Updated note |
| P1 | `delete_note` | Delete a note from the collection. | title | Success or error message |

---

## 4. Out of scope

The following features are not included in this project:

- User authentication and account management.
- Mobile or web user interface.
- Integration with paid APIs or cloud database services.

---

## 5. Success criteria

You succeed on Demo Day if:

- [ ] The model successfully searches notes and returns relevant results.
- [ ] The model lists the available notes correctly.
- [ ] The model adds a new note successfully using the MCP tool.

---

## 6. Top risks

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Limited time to complete all planned features | Medium | Focus on implementing all P0 tools before adding extra features. |
| MCP tool integration issues | Medium | Test each tool individually using MCP Inspector before the demo. |
| Incorrect search results | Low | Test the search tool with multiple sample notes and improve keyword matching. |

---

## 7. Evidence for Week 2

- [x] `docs/project-choice.md` filled
- [ ] ≥3 Zod schemas under `src/schemas/`
- [ ] Tools registered (stubs OK)
- [ ] `examples/<tool>.json` for each registered tool
- [ ] Inspector screenshots attached to the GitHub Issue

---

## Mentor decision

- Status: pending
- Comments: