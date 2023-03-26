import { asyncHandler } from "~/utils/asyncHandler";
import { bookPayloadSchema } from "./books.schemas";
import { BookService } from "./books.services";

export const createBookController = asyncHandler(async (req, res) => {
  const { userId, body } = req;

  const cleanedPayload = bookPayloadSchema.parse(body);

  const book = await BookService.createBook({
    ...cleanedPayload,
    publisher: {
      connect: {
        id: userId,
      },
    },
  });

  res.json(book);
});

export const getAllBooksController = asyncHandler(async (req, res) => {
  const { userId } = req;
  const books = await BookService.getAllBooks({
    publisherId: userId,
  });
  return res.json(books);
});
