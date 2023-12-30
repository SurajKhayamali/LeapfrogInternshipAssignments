import { Request, Response } from "express";

import * as authService from "../services/auth";

export const signup = async (req: Request, res: Response) => {
  //   const { name, email, password } = req.body;
  // const user = await userService.createUser(name, email, password);
  //   res.status(201).json(user);

  const { body } = req;

  console.log(body);

  await authService.signup(body);

  return res.json({
    message: "Signup successful!",
  });
};

export const login = async (req: Request, res: Response) => {
  //   const { email, password } = req.body;
  //   const user = await userService.login(email, password);
  //   res.json(user);

  const { body } = req;

  console.log(body);

  return res.json({
    message: "Login successful!",
  });
};
