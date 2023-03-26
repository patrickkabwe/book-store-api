import { Router } from "express";
import { protect } from "~/middleware/protect";
import {
  createBookController,
  getAllBooksController,
} from "./books.controllers";

const router = Router();

router.post("/", protect, createBookController);
router.get("/", protect, getAllBooksController);

export { router as booksRouter };
