# Week 4 Threat Model — Notes MCP

## P0 Tools Reviewed

### 1. search_notes

- **Unbounded input:** At risk because the `query` field has no maximum length.
- **Runaway responses:** Currently limited because the `limit` field is restricted to a maximum of 20 results.
- **Path traversal:** Not directly exposed because the tool does not accept a file path from the model.
- **SSRF:** Not applicable because the tool does not make network requests.
- **Secret leaks:** No secrets are used by this tool.

### 2. list_notes

- **Path traversal:** Reviewed because the tool accepts a `folder` input, but the current implementation does not use this value to access the filesystem. It is only returned in the response.
- **Runaway responses:** Partially mitigated because the tool returns at most 10 notes.
- **SSRF:** Not applicable because the tool does not make network requests.
- **Secret leaks:** No secrets are used by this tool.

### 3. add_note

- **Unbounded input:** At risk because `title`, `category`, and `content` have no maximum length.
- **Filesystem access:** The tool writes to the fixed `data/notes.json` path. The path is not controlled by the model.
- **Path traversal:** No direct path input is accepted by the tool.
- **SSRF:** Not applicable because the tool does not make network requests.
- **Secret leaks:** User-provided note content could potentially contain sensitive information, so inputs and logs should be handled carefully.

## Attack Surface Summary

- **Disk:** `search_notes` and `list_notes` read data through the shared notes/file helpers, while `add_note` reads and writes `data/notes.json`.
- **Network:** None of the current P0 tools make network requests.
- **User-controlled input:** `search_notes` accepts `query` and `limit`, `list_notes` accepts `folder`, and `add_note` accepts `title`, `category`, and `content`.

## Shared Components

- `readDataFile()` resolves paths inside the `data` directory and checks that the resolved path stays inside the directory.
- `fetchJson()` exists in `src/lib/http.ts`, but no current P0 tool uses it, so SSRF is not currently exposed through our P0 tools.
- The project has `.gitignore` and `.env.example`; secrets should not be committed or logged.

## Main Week 4 Risks

1. Unbounded string inputs in `search_notes` and `add_note`.
2. Filesystem boundary protection should be reviewed and hardened.
3. Secret handling and logging should be reviewed.
4. The unused HTTP helper should remain protected with URL allowlisting before being used by any tool.