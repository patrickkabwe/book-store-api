import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { type Request, type Response } from "express";
import { authRouter, usersRouter } from "~/modules";
import { booksRouter } from "./modules/books";
config();

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/api/v1", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/books", booksRouter);

app.use((err: any, _: Request, res: Response, __: any) => {
  const status = err.status || 500;
  res.status(status).send({
    status,
    message: err.message,
  });
});
