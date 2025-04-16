import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.post("/auth", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.delete("/logout", logoutUser);
userRoutes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default userRoutes;
