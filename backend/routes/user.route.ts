import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/auth", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.delete("/logout", logoutUser);
userRoutes.route("/profile").get(getUserProfile).put(updateUserProfile);

export default userRoutes;
