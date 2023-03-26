import { Book } from "@prisma/client";
import { randomUUID } from "crypto";

import { describe, expect, it, vi } from "vitest";
import { prisma } from "~/libs/__mocks__/prisma";

import { BookService } from "~/modules/books/books.services";

vi.mock("~/libs/prisma");

describe("BookService", () => {
  it("get user by email", async () => {
    const book: Book = {
      id: randomUUID() as string,
      title: "test",
      publisherId: randomUUID() as string,
      author: "Patrick",
      cover: "https://www.google.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      isbn: "12345678910",
      pages: 100,
      year: 2021,
    };

    // get all books

    prisma.book.findMany.mockResolvedValue([book]);

    const books = await BookService.getAllBooks({
      publisherId: book.publisherId,
    });

    expect(books).toEqual([book]);

    expect(prisma.book.findMany).toBeCalledWith({
      where: {
        publisherId: book.publisherId,
      },
    });
  });
});
