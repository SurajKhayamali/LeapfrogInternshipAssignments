import { NextFunction, Request, Response } from 'express';

import * as userService from '../services/user.service';

/**
 * Create user
 *
 * @param req
 * @param res
 */
export async function createUser(req: Request, res: Response) {
  const createUserDto = req.body;

  const user = await userService.createUser(createUserDto);

  res.status(201).json(user);
}

/**
 * Get all users
 *
 * @param req
 * @param res
 */
export async function getAllUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();

  res.json(users);
}

/**
 * Get user by id
 *
 * @param req
 * @param res
 * @param next
 */
export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(parseInt(id));

    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Update user
 *
 * @param req
 * @param res
 * @param next
 */
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const updateUserDto = req.body;

  try {
    const user = await userService.updateUser(parseInt(id), updateUserDto);

    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete user
 *
 * @param req
 * @param res
 * @param next
 */
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const user = await userService.deleteUser(parseInt(id));

    res.json(user);
  } catch (error) {
    next(error);
  }
}
