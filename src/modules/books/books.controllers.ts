import { asyncHandler } from "~/utils/asyncHandler";
import { bookPayloadSchema } from "./books.schemas";
import { BookService } from "./books.services";

export const createBookController = asyncHandler(async (req, res) => {
  const { user, body } = req;

  const cleanedPayload = bookPayloadSchema.parse(body);

  const book = await BookService.createBook({
    ...cleanedPayload,
    publisher: {
      connect: {
        id: user?.id,
      },
    },
  });

  res.json(book);
});

export const getAllBooksController = asyncHandler(async (req, res) => {
  const { user } = req;

  const books = await BookService.getAllBooks({
    publisherId: user?.id,
  });

  res.json(books);
});
