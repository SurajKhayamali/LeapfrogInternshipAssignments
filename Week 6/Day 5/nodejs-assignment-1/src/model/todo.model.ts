import {
  CreateTodoDto,
  QueryTodoDto,
  Todo,
  UpdateTodoDto,
} from '../interfaces/todo.interface';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Learn some new language',
    completed: false,
  },
  {
    id: 2,
    title: 'Learn how to learn a new language',
    completed: false,
  },
  {
    id: 3,
    title: 'Fail at learning a new language',
    completed: false,
  },
];

/**
 * Get all todos
 *
 * @returns todos
 */
export function getAllTodos() {
  return todos;
}

/**
 * Get filtered todos
 *
 * @param queryTodoDto
 *
 * @returns todos
 */
export function getFilteredTodos(queryTodoDto: QueryTodoDto) {
  const { searchTerm, completed } = queryTodoDto;

  const completedBool = completed === 'true' ? true : false;

  return todos.filter(
    (todo) =>
      (searchTerm
        ? todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true) && (completed ? todo.completed === completedBool : true)
  );
}

/**
 * Get todo by id
 *
 * @param id
 *
 * @returns todo
 */
export function getTodoById(id: number) {
  return todos.find((todo) => todo.id === id) || null;
}

/**
 * Create todo
 *
 * @param createTodoDto
 *
 * @returns todo
 */
export function createTodo(createTodoDto: CreateTodoDto) {
  const { title } = createTodoDto;

  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);

  return newTodo;
}

/**
 * Update todo by id
 *
 * @param id
 * @param updateTodoDto
 *
 * @returns todo
 */
export function updateTodoById(id: number, updateTodoDto: UpdateTodoDto) {
  const todo = getTodoById(id);
  if (!todo) return null;

  const { title } = updateTodoDto;

  if (!title) return todo;

  todo.title = title;

  return todo;
}

/**
 * Update todo completed by id
 *
 * @param id
 * @param completed
 *
 * @returns todo
 */
export function updateTodoCompletedById(id: number, completed: boolean) {
  const todo = getTodoById(id);
  if (!todo) return null;

  todo.completed = completed;

  return todo;
}

/**
 * Delete todo by id
 *
 * @param id
 *
 * @returns todo
 */
export function deleteTodoById(id: number) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) return null;

  const deletedTodos = todos.splice(todoIndex, 1);

  return deletedTodos[0];
}
