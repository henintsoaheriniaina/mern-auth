import dotenv from "dotenv";
dotenv.config;

type Config = {
  PORT: number;
  NODE_ENV: String;
  MONGO_URI: string;
  JWT_SECRET: string;
};

export const config: Config = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "developpement",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mern-auth",
  JWT_SECRET: process.env.JWT_SECRET || "1234",
};
