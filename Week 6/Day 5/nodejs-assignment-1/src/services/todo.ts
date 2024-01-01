import { CreateTodoDto, QueryTodoDto, UpdateTodoDto } from '../interfaces/todo';
import * as Todo from '../model/todo';

export async function createTodo(createTodoDto: CreateTodoDto) {
  return Todo.createTodo(createTodoDto);
}

export async function getTodos() {
  return Todo.getAllTodos();
}

export async function getFilteredTodos(queryTodoDto: QueryTodoDto) {
  return Todo.getFilteredTodos(queryTodoDto);
}

export async function getTodoById(id: number) {
  return Todo.getTodoById(id);
}

export async function updateTodoById(id: number, updateTodoDto: UpdateTodoDto) {
  return Todo.updateTodoById(id, updateTodoDto);
}

export async function updateTodoCompletedById(id: number, completed: boolean) {
  return Todo.updateTodoCompletedById(id, completed);
}

export async function deleteTodoById(id: number) {
  return Todo.deleteTodoById(id);
}
