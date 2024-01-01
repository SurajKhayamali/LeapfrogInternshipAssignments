import { Request, Response } from 'express';

import * as todoService from '../services/todo.service';
import {
  CreateTodoDto,
  QueryTodoDto,
  UpdateTodoDto,
} from '../interfaces/todo.interface';

export async function createTodo(
  req: Request<unknown, unknown, CreateTodoDto>,
  res: Response
) {
  const createTodoDto = req.body;

  const todo = await todoService.createTodo(createTodoDto);

  res.status(201).json(todo);
}

export async function getTodos(
  req: Request<unknown, unknown, unknown, QueryTodoDto>,
  res: Response
) {
  const queryTodoDto = req.query;

  const todos = await todoService.getFilteredTodos(queryTodoDto);

  res.json(todos);
}

export async function getTodoById(req: Request, res: Response) {
  const { id } = req.params;

  const todo = await todoService.getTodoById(parseInt(id));

  res.json(todo);
}

export async function updateTodoById(
  req: Request<{ id: string }, unknown, UpdateTodoDto>,
  res: Response
) {
  const { id } = req.params;
  const updateTodoDto = req.body;

  const todo = await todoService.updateTodoById(parseInt(id), updateTodoDto);

  res.json(todo);
}

export async function updateTodoAsCompleted(req: Request, res: Response) {
  const { id } = req.params;

  const todo = await todoService.updateTodoCompletedById(parseInt(id), true);

  res.json(todo);
}

export async function updateTodoAsNotCompleted(req: Request, res: Response) {
  const { id } = req.params;

  const todo = await todoService.updateTodoCompletedById(parseInt(id), false);

  res.json(todo);
}

export async function deleteTodoById(req: Request, res: Response) {
  const { id } = req.params;

  await todoService.deleteTodoById(parseInt(id));

  res.status(204).end();
}
