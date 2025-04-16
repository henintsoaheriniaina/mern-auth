import type { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import User from "../db/models/user.model";

export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = verify(token, config.JWT_SECRET);
        if (typeof decoded === "object" && "userId" in decoded) {
          req.user = await User.findById(decoded.userId).select("-password");
          next();
        } else {
          res.status(401);
          throw new Error("Invalid token");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Token not found");
    }
  }
);
