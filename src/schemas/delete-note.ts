import { z } from "zod/v4";

export const deleteNoteInputSchema = z.object({
  id: z
    .number()
    .int()
    .describe("ID of the note to delete"),
});