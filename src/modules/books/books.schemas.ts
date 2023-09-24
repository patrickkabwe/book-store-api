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
      required_error: "ISBN is required1",
    })
    .min(10, "ISBN must be 10 or 13 characters long")
    .max(13, "ISBN must be 10 or 13 characters long"),
  pages: z
    .number({
      invalid_type_error: "Pages must be a number",
      required_error: "Pages is required",
    })
    .min(1, "Pages must be greater than 0"),
  year: z
    .number({
      invalid_type_error: "Year must be a number",
      required_error: "Year is required",
    })
    .min(1, "Year must be greater than 0"),
});

export type BookPayload = z.infer<typeof bookPayloadSchema>;
