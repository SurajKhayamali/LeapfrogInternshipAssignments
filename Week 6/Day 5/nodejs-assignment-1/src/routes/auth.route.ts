import { Router } from 'express';
import {
  handleSignup,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from '../controllers/auth.controller';
import { signUpSchema } from '../schemas/auth.schema';
import { validateReqBody } from '../middlewares/validator.middleware';

const router = Router();

router.post('/signup', validateReqBody(signUpSchema), handleSignup);

router.post('/login', handleLogin);

router.post('/refresh', handleRefreshToken);

router.post('/logout', handleLogout);

export default router;
