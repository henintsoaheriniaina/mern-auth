import type { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../db/models/user.model";
import { generateAccessToken } from "../utils/jwt";

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateAccessToken(res, { userId: user._id });
      res.status(200).json({
        message: "Logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
      return;
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  }
);

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    if (!name || !email || !password) {
      res.status(400);
      throw new Error(
        "Please provide all required fields: name, email, and password"
      );
    }

    const user = await User.create({ name, email, password });
    if (user) {
      generateAccessToken(res, { userId: user._id });
      res.status(201).json({
        message: "Account created successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
      return;
    } else {
      res.status(500);
      throw new Error("Invalid User data");
    }
  }
);

export const logoutUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out" });
  }
);

export const getUserProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = {
      _id: req.user!._id,
      name: req.user!.name,
      email: req.user!.email,
    };

    res.status(200).json({ user });
  }
);

export const updateUserProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user!._id);
    if (user) {
      user.name = req.body?.name || user.name;
      user.email = req.body?.email || user.email;
      if (req.body?.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  }
);
