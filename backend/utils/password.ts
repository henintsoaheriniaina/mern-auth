// import { password } from "bun";

import { genSalt, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};
