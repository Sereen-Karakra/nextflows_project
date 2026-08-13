# Threat Model - Notes MCP

## Assets

- `./data/notes.json` and local note data stored under the `data` directory.
- The machine filesystem, especially files outside the intended `data` directory.
- Tool responses returned to the model, which should not contain excessive or unintended data.
- User-provided note content stored by `add_note`.
- API tokens or other secrets. The current P0 tools do not require any tokens or external API credentials.

## Trust Boundaries

- **Model -> Tool arguments:** `query`, `limit`, `folder`, `title`, `category`, and `content` are untrusted inputs and must be validated before use.
- **Tool -> Filesystem:** `search_notes` and `list_notes` read local data, while `add_note` writes to `data/notes.json`. File paths must remain inside the intended data directory.
- **Tool -> Network:** Current P0 tools do not make network requests. The unused `fetchJson()` helper is a future network boundary and must not accept arbitrary model-controlled URLs.

## Top 5 Risks

1. **Unbounded `search_notes` query:** A very large `query` can waste resources and increase processing or response size.
2. **Unbounded `add_note` input:** Large `title`, `category`, or `content` values can create oversized data and responses.
3. **Filesystem path traversal:** Future file access using model-controlled paths could read files outside `./data` if paths are not resolved and checked safely.
4. **SSRF through the HTTP helper:** If `fetchJson()` is exposed to a tool without restrictions, a model-controlled URL could access unintended or internal services.
5. **Sensitive data and excessive output:** Note content may contain sensitive information, and returning too much local data could expose unnecessary content to the model.

## Mitigations This Week

- Add Zod `.max()` limits to user-controlled strings and keep fixed numeric limits such as `limit.max(20)`.
- Resolve file paths with `path.resolve()` and verify that the resolved path remains inside the allowed data directory.
- Use an explicit hostname allowlist before allowing any tool to call external URLs through `fetchJson()`.
- Keep network requests protected with a short timeout and return a clear error when the timeout is exceeded.
- Add output size/row limits so tools return bounded responses and clearly indicate when data is truncated.
- Keep secrets out of source code, logs, and Git; use environment variables for any future credentials.

## Out of Scope

- Authentication and multi-user authorization are out of scope because this is a local student MCP project.
- Protecting the operating system or other applications from a fully compromised machine is out of scope.
- External API security is out of scope because the current P0 tools do not call external APIs.
- Advanced production infrastructure security is out of scope for this student project.