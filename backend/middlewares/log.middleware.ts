import type { NextFunction, Request, Response } from "express";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[${req.method}] --- ${req.url}`);
  next();
};
