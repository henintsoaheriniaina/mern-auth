import { compare } from "bcryptjs";
import { model, Schema } from "mongoose";
import type { IUser, IUserMethods } from "../../types/user";
import { hashPassword } from "../../utils/password";

const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

export default User;
