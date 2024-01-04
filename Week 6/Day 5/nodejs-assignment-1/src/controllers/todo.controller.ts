import { NextFunction, Request, Response } from 'express';

import * as todoService from '../services/todo.service';
import {
  CreateTodoDto,
  QueryTodoDto,
  UpdateTodoDto,
} from '../interfaces/todo.interface';
import { JwtPayload } from '../interfaces/jwt.interface';

/**
 * Create a new todo
 *
 * @param req
 * @param res
 */
export async function createTodo(
  req: Request<unknown, unknown, CreateTodoDto> & {
    user?: JwtPayload;
  },
  res: Response
) {
  const createTodoDto = req.body;
  const createdById = req.user?.userId;

  if (!createdById) throw new Error('User not found');

  const todo = await todoService.create({
    ...createTodoDto,
    createdBy: createdById,
  });

  res.status(201).json(todo);
}

/**
 * Get all todos
 *
 * @param req
 * @param res
 */
export async function getTodos(req: Request, res: Response) {
  const queryTodoDto = req.query as unknown as QueryTodoDto;

  const todos = await todoService.getFiltered(queryTodoDto);

  res.json(todos);
}

/**
 * Get todo by id
 *
 * @param req
 * @param res
 * @param next
 */
export async function getTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const todo = await todoService.getById(parseInt(id));

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * Update todo by id
 *
 * @param req
 * @param res
 * @param next
 */
export async function updateTodoById(
  req: Request<{ id: string }, unknown, UpdateTodoDto> & {
    user?: JwtPayload;
  },
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const updateTodoDto = req.body;
  const updatedById = req.user?.userId;

  if (!updatedById) throw new Error('User not found');

  try {
    const todo = await todoService.update(parseInt(id), {
      ...updateTodoDto,
      updatedBy: updatedById,
    });

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * Update todo as completed
 *
 * @param req
 * @param res
 * @param next
 */
export async function updateTodoAsCompleted(
  req: Request & {
    user?: JwtPayload;
  },
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const updatedById = req.user?.userId;

  if (!updatedById) throw new Error('User not found');

  try {
    const todo = await todoService.updateCompleted(
      parseInt(id),
      true,
      updatedById
    );

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * Update todo as not completed
 *
 * @param req
 * @param res
 * @param next
 */
export async function updateTodoAsNotCompleted(
  req: Request & {
    user?: JwtPayload;
  },
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const updatedById = req.user?.userId;

  if (!updatedById) throw new Error('User not found');

  try {
    const todo = await todoService.updateCompleted(
      parseInt(id),
      false,
      updatedById
    );

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete todo by id
 *
 * @param req
 * @param res
 * @param next
 */
export async function deleteTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    await todoService.remove(parseInt(id));

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
