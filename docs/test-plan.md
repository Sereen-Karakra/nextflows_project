# Week 5 Manual Test Plan

## Purpose

This test plan covers the three P0 tools of the Notes MCP Server before and during manual execution in MCP Inspector.

The test cases cover happy paths, invalid inputs, an empty-data case, and an offline case.

## Test Cases

| id | tool | setup | input | expected | result | evidence |
|---|---|---|---|---|---|---|
| TC-01 | `search_notes` | Start the MCP server from the project root. Use the default `data/notes.json` fixture. | `examples/search_notes.json` — `{"query":"Git","limit":5}` | The tool searches the local notes and returns matching notes successfully, with no more than 5 results. | PASS | Screenshot: TC-01 happy path — `search_notes` returned 4 matching notes for `Git`. |
| TC-02 | `list_notes` | Start the MCP server from the project root. Use the default `data/notes.json` fixture. | `examples/list_notes.json` — `{"folder":"notes"}` | The tool returns the available notes with their IDs, titles, and categories, with the expected folder value reported as `notes`. | PASS | Screenshot: TC-02 happy path — `list_notes` returned the 5 notes with their IDs, titles, categories, and `folder: "notes"`. |
| TC-03 | `add_note` | Start the MCP server from the project root. Back up or reset `data/notes.json` before the test because this operation modifies the fixture. | `examples/add_note.json` — `{"title":"office-hours","category":"Academy","content":"Mentor office hours are Wednesdays 1:30–3:30 PM."}` | The tool successfully creates a new note, returns `success: true`, and returns the created note with a new ID. Reset `data/notes.json` to the original fixture after the test. | PASS | Screenshot: TC-03 happy path — `add_note` returned `success: true` and created note ID 6. The fixture was restored after the test. |
| TC-04 | `search_notes` | Start the MCP server with the default data fixture. | Invalid input with an empty `query`, for example `{"query":"","limit":5}` | Input validation rejects the request because `query` must contain at least 1 character. | PASS | Screenshot: TC-04 validation rejection — `search_notes` rejected the request because `query` was empty. |
| TC-05 | `list_notes` | Start the MCP server with the default data fixture. | Invalid input with `folder` set to `null`, for example `{"folder":null}` | Input validation rejects the request because `folder`, when provided, must be a string. | PASS | Screenshot: TC-05 validation rejection — `list_notes` rejected `folder: null` with `expected string, received null`. |
| TC-06 | `add_note` | Start the MCP server with the default data fixture. | Invalid input with the required `content` field missing, for example `{"title":"Test","category":"Testing"}` | Input validation rejects the request because `content` is required. | PASS | Screenshot: TC-06 validation rejection — `add_note` rejected the request because `content` was missing. |
| TC-07 | `search_notes` | Temporarily use an empty `data/notes.json` fixture containing `[]`. Restore the original fixture after the test. | `{"query":"office hours","limit":5}` | The tool completes successfully and returns no matching notes. The tool response indicates that no matching notes were found. | PASS | Screenshot: TC-07 empty-data case — `search_notes` returned `items: []` and `No matching notes found.` |
| TC-08 | `search_notes` | Disconnect the internet or disable Wi-Fi before running the test. The P0 tool uses only local data and does not require network access. | `{"query":"Git","limit":5}` | The tool still completes successfully and returns matching local notes even when the machine is offline. | PASS | Screenshot: TC-08 offline case — `search_notes` returned the local Git notes successfully while offline. |

## Fixture Reset Notes

- Keep a copy of the original `data/notes.json` before tests that modify or replace the fixture.
- Restore the original `data/notes.json` after `TC-03`.
- Restore the original `data/notes.json` after `TC-07`.
- The temporary backup file was removed after restoring the original fixture.
- Do not leave test data or temporary fixture changes in the repository after testing.

## Execution Notes

- All 8 manual test cases were executed in MCP Inspector.
- All 8 test cases passed.
- No code fixes were required as a result of the manual tests.
- The `search_notes` example input was updated to use `Git`, which matches the current local fixture and produces a reliable happy-path result.
- The `add_note` example input was updated to match the current tool schema using `category` and `content`.
- Evidence screenshots were captured for the happy paths, validation rejections, empty-data case, and offline case.
- The original `data/notes.json` fixture was restored after the temporary empty-data test.