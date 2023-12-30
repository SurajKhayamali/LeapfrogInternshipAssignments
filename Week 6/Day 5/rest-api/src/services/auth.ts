import config from "../config";
import bcrypt from "bcrypt";
import { ISignup } from "../interfaces/auth";

export async function signup(body: ISignup) {
  //   const { name, email, password } = body;
  //   const user = await userService.createUser(name, email, password);
  //   return user;
  const { password } = body;
  //   console.log(password, config.saltRounds);
  bcrypt.hash(password, config.saltRounds, async (err, hash) => {
    if (err) {
      throw err;
    }
    // const user = await userService.createUser({
    //   ...body,
    //   password: hash,
    // });
    // return user;

    // Store hash in your password DB.
    console.log({ hash });
  });

  return;
}

export async function login() {
  return;
}
