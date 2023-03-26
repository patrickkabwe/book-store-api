import { Book, User } from "@prisma/client";
import { randomUUID } from "crypto";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "~/app";
import { prisma } from "~/libs/__mocks__/prisma";

const agent = request.agent(app);

vi.mock("~/libs/prisma");

describe("Get All Books", () => {
  it("should fail if user is not logged in", async () => {
    const response = await agent.get("/api/v1/books");

    expect(response.status).toBe(401);
  });

  it("should get all books", async () => {
    const user: User = {
      id: randomUUID() as string,
      email: "test@gmail.com",
      password: "test",
      name: "Test",
    };

    const book: Book = {
      id: randomUUID() as string,
      title: "test",
      publisherId: user.id,
      author: "Patrick",
      cover: "https://www.google.com",
      createdAt: String(new Date()) as any,
      updatedAt: String(new Date()) as any,
      isbn: "123456789",
      pages: 100,
      year: 2021,
    };

    prisma.user.findUnique.mockResolvedValue(user);

    const loginResponse = await agent.post("/api/v1/login").send({
      email: "test@gmail.com",
      password: "test",
    });

    // get all books
    prisma.book.findMany.mockResolvedValue([book]);

    agent.set("Authorization", `Bearer ${loginResponse.body.token}`);
    const response = await agent.get("/api/v1/books");

    expect(response.status).toBe(200);

    expect(response.body.length).toBe(1);

    expect(response.body).toEqual([book]);
  });
});
