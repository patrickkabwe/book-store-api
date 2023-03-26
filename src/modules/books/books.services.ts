import { Prisma } from "@prisma/client";
import { prisma } from "~/libs/prisma";

export class BookService {
  static async createBook(payload: Prisma.BookCreateInput) {
    const book = await prisma.book.create({
      data: payload,
    });

    return book;
  }

  static async getAllBooks(where?: Prisma.BookWhereInput) {
    const books = await prisma.book.findMany({
      where,
    });

    return books;
  }
}
