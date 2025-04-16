import mongoose from "mongoose";
import { config } from "../../config/config";

export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
  }
};
