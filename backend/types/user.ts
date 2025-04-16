import type { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}
export interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}
