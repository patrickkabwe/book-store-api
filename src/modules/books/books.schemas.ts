import { z } from "zod";

export const bookPayloadSchema = z.object({
  title: z.string(),
  author: z.string(),
  cover: z.string({
    required_error: "Cover is required",
  }),
  isbn: z
    .string({
      invalid_type_error: "ISBN must be a string",
      required_error: "ISBN is required",
    })
    .min(10, "ISBN must be 10 or 13 characters long")
    .max(13, "ISBN must be 10 or 13 characters long"),
  pages: z.number().min(1),
  year: z.number().min(1),
});

export type BookPayload = z.infer<typeof bookPayloadSchema>;
