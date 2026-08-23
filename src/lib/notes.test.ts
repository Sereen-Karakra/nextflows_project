import test from "node:test";
import assert from "node:assert/strict";

import { filterNotes, updateNote } from "./notes.js";

import type { Note } from "../schemas/note.js";

const notes: Note[] = [
  {
    id: 1,
    title: "Git Branches",
    category: "Git",
    content: "A note about Git branches.",
  },
  {
    id: 2,
    title: "MCP Basics",
    category: "MCP",
    content: "Introduction to Model Context Protocol.",
  },
  {
    id: 3,
    title: "Office Hours",
    category: "Academy",
    content: "Mentor office hours are on Wednesday.",
  },
];

test("filterNotes finds notes by title", () => {
  const result = filterNotes(notes, "Branches");

  assert.equal(result.length, 1);
  assert.equal(result[0].title, "Git Branches");
});

test("filterNotes finds notes by category", () => {
  const result = filterNotes(notes, "MCP");

  assert.equal(result.length, 1);
  assert.equal(result[0].category, "MCP");
});

test("filterNotes finds notes by content", () => {
  const result = filterNotes(notes, "Wednesday");

  assert.equal(result.length, 1);
  assert.equal(result[0].title, "Office Hours");
});

test("filterNotes is case-insensitive", () => {
  const result = filterNotes(notes, "git");

  assert.equal(result.length, 1);
  assert.equal(result[0].title, "Git Branches");
});

test("filterNotes returns an empty array when there are no matches", () => {
  const result = filterNotes(notes, "database");

  assert.deepEqual(result, []);
});

test("updateNote updates an existing note", async () => {
  const result = await updateNote(
    1,
    "Git Branches Updated",
    "Git",
    "Updated content about Git branches.",
  );

  assert.equal(result.id, 1);
  assert.equal(result.title, "Git Branches Updated");
  assert.equal(result.category, "Git");
  assert.equal(result.content, "Updated content about Git branches.");
});

test("updateNote throws an error when note does not exist", async () => {
  await assert.rejects(
    updateNote(
      999,
      "Test",
      "Testing",
      "This note should not be updated.",
    ),
    /Note with ID 999 not found/,
  );
});