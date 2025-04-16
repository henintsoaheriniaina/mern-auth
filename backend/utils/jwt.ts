import type { Response } from "express";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

export const generateAccessToken = (res: Response, payload: object) => {
  const token = sign(payload, config.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
