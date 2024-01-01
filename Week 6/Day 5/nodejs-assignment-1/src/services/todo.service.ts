import {
  CreateTodoDto,
  QueryTodoDto,
  UpdateTodoDto,
} from '../interfaces/todo.interface';
import * as Todo from '../model/todo.model';

/**
 * Create a new todo
 *
 * @param createTodoDto
 *
 * @returns todo
 */
export async function createTodo(createTodoDto: CreateTodoDto) {
  return Todo.createTodo(createTodoDto);
}

/**
 * Get all todos
 *
 * @returns todos
 */
export async function getTodos() {
  return Todo.getAllTodos();
}

/**
 * Get filtered todos
 *
 * @param queryTodoDto
 *
 * @returns todos
 */
export async function getFilteredTodos(queryTodoDto: QueryTodoDto) {
  return Todo.getFilteredTodos(queryTodoDto);
}

/**
 * Get todo by id
 *
 * @param id
 *
 * @returns todo
 */
export async function getTodoById(id: number) {
  return Todo.getTodoById(id);
}

/**
 * Update todo by id
 *
 * @param id
 * @param updateTodoDto
 *
 * @returns todo
 */
export async function updateTodoById(id: number, updateTodoDto: UpdateTodoDto) {
  return Todo.updateTodoById(id, updateTodoDto);
}

/**
 * Update todo completed by id
 *
 * @param id
 * @param completed
 *
 * @returns todo
 */
export async function updateTodoCompletedById(id: number, completed: boolean) {
  return Todo.updateTodoCompletedById(id, completed);
}

/**
 * Delete todo by id
 *
 * @param id
 */
export async function deleteTodoById(id: number) {
  return Todo.deleteTodoById(id);
}
