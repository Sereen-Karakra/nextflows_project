import { z } from "zod/v4";

export const addNoteInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe("Title of the new note"),

  category: z
    .string()
    .min(1)
    .max(50)
    .describe("Category of the note"),

  content: z
    .string()
    .min(1)
    .max(5000)
    .describe("Content of the note"),
});