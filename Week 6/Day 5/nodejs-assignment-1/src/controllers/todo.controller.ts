import { NextFunction, Request, Response } from 'express';

import * as todoService from '../services/todo.service';
import {
  CreateTodoDto,
  QueryTodoDto,
  UpdateTodoDto,
} from '../interfaces/todo.interface';

/**
 * Create a new todo
 *
 * @param req
 * @param res
 */
export async function createTodo(
  req: Request<unknown, unknown, CreateTodoDto>,
  res: Response
) {
  const createTodoDto = req.body;

  const todo = await todoService.createTodo(createTodoDto);

  res.status(201).json(todo);
}

/**
 * Get all todos
 *
 * @param req
 * @param res
 */
export async function getTodos(
  req: Request<unknown, unknown, unknown, QueryTodoDto>,
  res: Response
) {
  const queryTodoDto = req.query;

  const todos = await todoService.getFilteredTodos(queryTodoDto);

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
    const todo = await todoService.getTodoById(parseInt(id));

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
  req: Request<{ id: string }, unknown, UpdateTodoDto>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const updateTodoDto = req.body;

  try {
    const todo = await todoService.updateTodoById(parseInt(id), updateTodoDto);

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
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const todo = await todoService.updateTodoCompletedById(parseInt(id), true);

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
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const todo = await todoService.updateTodoCompletedById(parseInt(id), false);

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
    await todoService.deleteTodoById(parseInt(id));

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
