# Week 5 Manual Test Plan

## Purpose

This test plan covers the three P0 tools of the Notes MCP Server before executing the tests in MCP Inspector.

The test cases include happy paths, invalid inputs, an empty-data case, and a simulated offline/timeout case.

## Test Cases

| id | tool | setup | input | expected | result | evidence |
|---|---|---|---|---|---|---|
| TC-01 | `search_notes` | Start the MCP server from the project root. Use the default `data/notes.json` fixture. | `examples/search_notes.json` — `{"query":"office hours","limit":5}` | The tool searches the local notes and returns matching notes successfully, with no more than 5 results. | | |
| TC-02 | `list_notes` | Start the MCP server from the project root. Use the default `data/notes.json` fixture. | `examples/list_notes.json` — `{"folder":"notes"}` | The tool returns the available notes with their IDs, titles, and categories, with the expected folder value reported as `notes`. | | |
| TC-03 | `add_note` | Start the MCP server from the project root. Back up or reset `data/notes.json` before the test because this operation modifies the fixture. | `examples/add_note.json` — `{"title":"office-hours","category":"Academy","content":"Mentor office hours are Wednesdays 1:30–3:30 PM."}` | The tool successfully creates a new note, returns `success: true`, and returns the created note with a new ID. Reset `data/notes.json` to the original fixture after the test. | | |
| TC-04 | `search_notes` | Start the MCP server with the default data fixture. | Invalid input with an empty `query`, for example `{"query":"","limit":5}` | Input validation rejects the request because `query` must contain at least 1 character. | | |
| TC-05 | `list_notes` | Start the MCP server with the default data fixture. | Invalid input with an empty `folder`, for example `{"folder":""}` | Input validation rejects the request because `folder`, when provided, must contain at least 1 character. | | |
| TC-06 | `add_note` | Start the MCP server with the default data fixture. | Invalid input with the required `content` field missing, for example `{"title":"Test","category":"Testing"}` | Input validation rejects the request because `content` is required. | | |
| TC-07 | `search_notes` | Temporarily use an empty `data/notes.json` fixture containing `[]`. Restore the original fixture after the test. | `{"query":"office hours","limit":5}` | The tool completes successfully and returns no matching notes. The tool response should indicate that no matching notes were found. | | |
| TC-08 | `search_notes` | Disconnect the internet or disable Wi-Fi before running the test. The P0 tool uses only local data and does not require network access. | `{"query":"office hours","limit":5}` | The tool still completes successfully and returns matching local notes even when the machine is offline. | | |

## Fixture Reset Notes

- Keep a copy of the original `data/notes.json` before tests that modify or replace the fixture.
- Restore the original `data/notes.json` after `TC-03`.
- Restore the original `data/notes.json` after `TC-07`.
- Do not leave test data or temporary fixture changes in the repository after testing.

## Execution Notes

The `result` and `evidence` columns are intentionally left blank at this stage.

They will be completed during Section 5.2 after the manual test plan is executed in MCP Inspector.