import { Router } from 'express';

import authRouter from './auth.route';
import userRouter from './user.route';
import todoRouter from './todo.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/todos', todoRouter);

export default router;
