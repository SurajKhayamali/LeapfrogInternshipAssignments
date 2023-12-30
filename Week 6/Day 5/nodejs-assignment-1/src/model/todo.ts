import { CreateTodoDto, Todo, UpdateTodoDto } from '../interfaces/todo';

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

export function getAllTodos() {
  return todos;
}

export function getFilteredTodos(searchTerm: string) {
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function getTodoById(id: number) {
  return todos.find((todo) => todo.id === id) || null;
}

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

export function updateTodoById(id: number, updateTodoDto: UpdateTodoDto) {
  const { title } = updateTodoDto;
  if (!title) return null;

  const todo = getTodoById(id);
  if (!todo) return null;

  todo.title = title;

  return todo;
}

export function updateTodoCompletedById(id: number, completed: boolean) {
  const todo = getTodoById(id);
  if (!todo) return null;

  todo.completed = completed;

  return todo;
}

export function deleteTodoById(id: number) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) return null;

  todos.splice(todoIndex, 1);
  return true;
}
