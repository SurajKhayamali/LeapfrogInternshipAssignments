import { Router } from 'express';
import {
  handleSignup,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from '../controllers/auth';

const router = Router();

router.post('/signup', handleSignup);

router.post('/login', handleLogin);

router.post('/refresh', handleRefreshToken);

router.post('/logout', handleLogout);

export default router;
