import { z } from "zod/v4";

export const updateNoteInputSchema = z.object({
  id: z
    .number()
    .int()
    .describe("ID of the note to update"),

  title: z
    .string()
    .min(1)
    .max(100)
    .describe("Updated title of the note"),

  category: z
    .string()
    .min(1)
    .max(50)
    .describe("Updated category of the note"),

  content: z
    .string()
    .min(1)
    .max(5000)
    .describe("Updated content of the note"),
});