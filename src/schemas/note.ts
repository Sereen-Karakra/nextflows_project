import { z } from "zod";

export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  content: z.string(),
});

export const notesSchema = z.array(noteSchema);

export type Note = z.infer<typeof noteSchema>;