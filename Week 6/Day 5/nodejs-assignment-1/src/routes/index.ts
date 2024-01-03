import { Router } from 'express';

import authRouter from './auth.route';
import userRouter from './user.route';
import todoRouter from './todo.route';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/todos', auth, todoRouter);

export default router;
