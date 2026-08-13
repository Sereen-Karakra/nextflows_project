# Week 4 Peer Review Checklist

## Project Information

- **Project:** Notes MCP Server
- **Repository:** nextflows_project
- **Branch:** `week-4-harden`
- **Peer Reviewer:** Zainab Abu Awwad
- **Review:** Week 4 On-site Peer Review

---

## Review Checklist

| Area | Result | Notes |
| --- | --- | --- |
| Zod schemas | PASS | P0 tool inputs have validation with minimum and maximum limits. |
| Error handling | PASS | Tool errors returned to the model are short and do not expose raw stack traces. |
| Secrets | PASS | `.env` and `.env.local` are ignored and `.env.example` contains placeholders only. |
| Filesystem boundary | PASS | Data paths are resolved and checked to remain inside the data directory. |
| Network allowlist | PASS | The shared HTTP helper allows only HTTPS requests to the configured host allowlist. |
| Network timeout | PASS | Network requests use an 8-second timeout. |
| Output caps | PASS | `search_notes` and `list_notes` limit the number of returned results and report truncation. |
| README | PASS | README was updated with setup instructions, Inspector usage, P0 tools, security information, and the demo path. |
| Demo path | PASS | The three P0 tools and an invalid-input case were tested through MCP Inspector. |

---

## P0 Tools Reviewed

### 1. `search_notes`

- **Priority:** P0
- **Result:** PASS
- Search input is validated.
- `query` is limited to 1–200 characters.
- `limit` is validated as an integer from 1–20.
- Results are capped according to the requested limit.
- No network request is made by this tool.
- No direct filesystem path is accepted from the model.

### 2. `list_notes`

- **Priority:** P0
- **Result:** PASS
- The optional `folder` input is validated.
- `folder` is limited to 1–100 characters.
- The current implementation does not use the folder value to access arbitrary filesystem paths.
- Returned note summaries are capped at 10 items.
- Truncation is reported when necessary.

### 3. `add_note`

- **Priority:** P0
- **Result:** PASS
- `title` is limited to 1–100 characters.
- `category` is limited to 1–50 characters.
- `content` is limited to 1–5000 characters.
- The tool writes to the fixed local notes data file.
- Invalid required input is rejected before the tool operation runs.

---

## Attack / Invalid Input Test

### Test Performed

An invalid `add_note` request was submitted without the required `content` field in MCP Inspector.

### Result

**PASS — Request rejected by input validation.**

The Inspector returned an input validation error similar to:

```text
Tool Error
Input validation error: Invalid arguments for tool add_note:
content: Invalid input: expected string, received undefined
```

The invalid request was not silently accepted.

---

## Security Review

### Filesystem Protection

The shared file helper resolves paths using `path.resolve()` and checks the relative path using `path.relative()`.

Paths that escape the configured data directory are rejected.

### Network Protection

The shared HTTP helper:

- Requires HTTPS.
- Uses an explicit hostname allowlist.
- Rejects hosts outside the allowlist.
- Uses an 8-second timeout.

The current P0 tools do not make network requests.

### Secrets

The current P0 tools do not require API keys or external credentials.

The repository contains:

- `.gitignore`
- `.env.example`

No real secrets are required by the current P0 tools.

### Error Handling

Tool error responses are short and actionable.

Raw stack traces are logged for local debugging but are not returned to the model as tool output.

---

## Findings

### P0 Findings

**None identified.**

No must-fix P0 security findings were identified during the peer review.

### Documentation Finding

The README needed clearer information about:

- Project setup
- Running MCP Inspector
- The three P0 tools
- The security hardening
- The demo path

This action item was addressed by updating `README.md`.

---

## Action Items

| Action Item | Owner | Due Date | Status |
| --- | --- | --- | --- |
| Complete README with setup instructions, Inspector usage, P0 tools, security information, and demo path | Sereen Karakra | End of Week 4 | Completed |
| Peer confirms the README/documentation fix | Zainab Abu Awwad | End of Week 4 | Pending confirmation |

---

## Peer Feedback

The three P0 tools were tested successfully during the review.

The validation and security hardening were reviewed, including input limits, filesystem protection, network allowlisting, timeouts, output limits, error handling, and secret handling.

The invalid `add_note` request was rejected correctly by input validation.

No P0 must-fix security findings were identified.

The main recommended improvement was to make the README clearer by documenting the setup process, MCP Inspector usage, the three P0 tools, and the demo path. These items were addressed in the updated README.

Overall, the project is in good shape for the Week 4 hardening review and can move forward after the peer confirms the documentation fix.

---

## Review Conclusion

- [x] Three P0 tools reviewed
- [x] `search_notes` tested
- [x] `list_notes` tested
- [x] `add_note` tested
- [x] Invalid input attack tested
- [x] Input validation reviewed
- [x] Error handling reviewed
- [x] Secrets reviewed
- [x] Filesystem boundary reviewed
- [x] Network allowlist reviewed
- [x] Network timeout reviewed
- [x] Output caps reviewed
- [x] README updated
- [x] No P0 findings identified
- [x] Peer confirmation of the README fix
- [x] Hardening PR merged after peer confirmation
- [x] Week 4 issue updated as ready to move on

---

## Peer Reviewer

**Zainab Abu Awwad**

**Review Status:** Completed, pending final confirmation of the README/documentation fix.