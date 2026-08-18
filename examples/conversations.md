# Example Conversations

These examples show how a person can use the Notes MCP Server together with a model.

## Conversation A — Search for a Note

### User prompt

> Find my notes about Git.

### Expected tool calls

1. `search_notes`
   - `query`: `"Git"`
   - `limit`: `5`

### Good final answer

> I found the notes related to Git and can summarize them for you if needed.

---

## Conversation B — List Available Notes

### User prompt

> Show me the available notes.

### Expected tool calls

1. `list_notes`
   - `folder`: `"notes"`

### Good final answer

> I found the available notes and can show you their titles and categories.

---

## Conversation C — Add and Find a Note

### User prompt

> Add a note about office hours, then find it.

### Expected tool calls

1. `add_note`
   - `title`: `"office-hours"`
   - `category`: `"Academy"`
   - `content`: `"Mentor office hours are Wednesdays 1:30–3:30 PM."`

2. `search_notes`
   - `query`: `"office-hours"`
   - `limit`: `5`

### Good final answer

> I added the office-hours note successfully and found it in the notes.