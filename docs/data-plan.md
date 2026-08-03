# Week 3 Data Plan

This document describes the data source, storage, expected responses, and possible failure cases for each P0 tool. All P0 tools use a local JSON fixture to ensure the project works completely offline during Demo Day.

| Tool | Source | Fixture Path | Auth | Rate Limits | Failure Modes | Example Response |
|------|--------|--------------|------|-------------|---------------|------------------|
| `search_notes` | Local JSON | `data/notes.json` | None | None | File not found, empty file, invalid JSON, no matching notes found | `{"results":[{"id":1,"title":"Git Branches","category":"Git"}]}` |
| `list_notes` | Local JSON | `data/notes.json` | None | None | File not found, empty file, invalid JSON | `{"notes":[{"id":1,"title":"Git Branches"},{"id":2,"title":"Git Merge"},{"id":3,"title":"Model Context Protocol"}]}` |
| `add_note` | Local JSON | `data/notes.json` | None | None | Missing title, missing content, invalid JSON, failed to save file | `{"success":true,"message":"Note added successfully.","note":{"id":6,"title":"Git Tags","category":"Git"}}` |

---

## Example Responses

### search_notes

```json
{
  "results": [
    {
      "id": 1,
      "title": "Git Branches",
      "category": "Git",
      "content": "A Git branch allows developers to work on features independently without affecting the main branch."
    }
  ]
}
```

### list_notes

```json
{
  "notes": [
    {
      "id": 1,
      "title": "Git Branches"
    },
    {
      "id": 2,
      "title": "Git Merge"
    },
    {
      "id": 3,
      "title": "Model Context Protocol"
    }
  ]
}
```

### add_note

```json
{
  "success": true,
  "message": "Note added successfully.",
  "note": {
    "id": 6,
    "title": "Git Tags",
    "category": "Git"
  }
}
```

---

## Notes

- All P0 tools use the shared local JSON fixture file `data/notes.json`.
- No authentication is required for this project.
- No rate limits apply because all data is stored locally.
- No external APIs are used during Week 3.
- The project is designed to work completely offline during Demo Day.

---

## Data Source Summary

All P0 tools use the shared local fixture file `data/notes.json`. This ensures the project works fully offline during Demo Day without relying on external services or internet connectivity.