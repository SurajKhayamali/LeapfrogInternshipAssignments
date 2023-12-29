import { Request, Response } from "express";

// import * as userService from "../services/user";

// export async function createUser(req: Request, res: Response) {
//   const { name, email, password } = req.body;

//   const user = await userService.createUser(name, email, password);

//   res.status(201).json(user);
// }

export async function getUsers(req: Request, res: Response) {
  // const users = await userService.getUsers();

  // res.json(users);

  const params = req.query;
  res.json({
    data: params,
  });
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  // const user = await userService.getUserById(parseInt(id));
  // res.json(user);

  res.json({
    message: `User with id ${id} found!`,
  });
}

// export async function updateUser(req: Request, res: Response) {
//   const { id } = req.params;
//   const { name, email, password } = req.body;

//   const user = await userService.updateUser(
//     parseInt(id),
//     name,
//     email,
//     password
//   );

//   res.json(user);
// }

// export async function deleteUser(req: Request, res: Response) {
//   const { id } = req.params;

//   await userService.deleteUser(parseInt(id));

//   res.sendStatus(204);
// }
