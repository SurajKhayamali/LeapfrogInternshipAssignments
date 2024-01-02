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
import {
  validateReqBody,
  validateReqQuery,
} from '../middlewares/validator.middleware';
import {
  todoCreateSchema,
  todoQuerySchema,
  todoUpdateSchema,
} from '../schemas/todo.schema';

const router = Router();

router.post('/', validateReqBody(todoCreateSchema), createTodo);

router.get('/', validateReqQuery(todoQuerySchema), getTodos);

router.get('/:id', getTodoById);

router.patch('/:id', validateReqBody(todoUpdateSchema), updateTodoById);

router.patch('/:id/complete', updateTodoAsCompleted);

router.patch('/:id/uncomplete', updateTodoAsNotCompleted);

router.delete('/:id', deleteTodoById);

export default router;
