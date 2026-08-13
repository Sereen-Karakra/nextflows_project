import fs from "node:fs/promises";
import path from "node:path";

import { readDataFile } from "./file.js";
import { notesSchema, type Note } from "../schemas/note.js";

export async function loadNotes(): Promise<Note[]> {
  const json = await readDataFile("notes.json");
  return notesSchema.parse(JSON.parse(json));
}

export async function searchNotes(query: string): Promise<Note[]> {
  const notes = await loadNotes();

  const keyword = query.toLowerCase();

  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(keyword) ||
      note.category.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword),
  );
}

export async function listNotes(): Promise<
  Pick<Note, "id" | "title" | "category">[]
> {
  const notes = await loadNotes();

  return notes.map((note) => ({
    id: note.id,
    title: note.title,
    category: note.category,
  }));
}

export async function addNote(
  title: string,
  category: string,
  content: string,
): Promise<Note> {
  const notes = await loadNotes();

  const newNote: Note = {
    id:
      notes.length > 0
        ? Math.max(...notes.map((note) => note.id)) + 1
        : 1,
    title,
    category,
    content,
  };

  notes.push(newNote);

  const filePath = path.resolve(process.cwd(), "data", "notes.json");

  await fs.writeFile(
    filePath,
    JSON.stringify(notes, null, 2),
    "utf-8",
  );

  return newNote;
}