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
import { validateReqBody } from '../middlewares/validator.middleware';
import { todoCreateSchema, todoUpdateSchema } from '../schemas/todo.schema';

const router = Router();

router.post('/', validateReqBody(todoCreateSchema), createTodo);

router.get('/', getTodos);

router.get('/:id', getTodoById);

router.patch('/:id', validateReqBody(todoUpdateSchema), updateTodoById);

router.patch('/:id/complete', updateTodoAsCompleted);

router.patch('/:id/uncomplete', updateTodoAsNotCompleted);

router.delete('/:id', deleteTodoById);

export default router;
