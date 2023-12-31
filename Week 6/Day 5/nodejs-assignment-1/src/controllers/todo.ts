import { Request, Response } from 'express';

import * as todoService from '../services/todo';
import { CreateTodoDto, QueryTodoDto, UpdateTodoDto } from '../interfaces/todo';

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
  const { searchTerm } = req.query;

  let todos = [];

  if (searchTerm) {
    todos = await todoService.getFilteredTodos(searchTerm);
  } else {
    todos = await todoService.getTodos();
  }

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
