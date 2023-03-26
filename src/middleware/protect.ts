import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request extends Express.Request {
    userId?: string;
  }
}
export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");

    if (!accessToken) {
      next(createHttpError(401, "Not authorized"));
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!);

    req.userId = decoded as string;

    next();
  } catch (err) {
    return next(createHttpError(401, "Not authorized"));
  }
};
