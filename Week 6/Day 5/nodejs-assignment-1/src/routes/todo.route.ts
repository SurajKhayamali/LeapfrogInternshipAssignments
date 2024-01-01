import { Router } from 'express';

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  updateTodoAsCompleted,
  updateTodoAsNotCompleted,
  deleteTodoById,
} from '../controllers/todo.controller';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.get('/:id', getTodoById);

router.patch('/:id', updateTodoById);

router.patch('/:id/complete', updateTodoAsCompleted);

router.patch('/:id/uncomplete', updateTodoAsNotCompleted);

router.delete('/:id', deleteTodoById);

export default router;
