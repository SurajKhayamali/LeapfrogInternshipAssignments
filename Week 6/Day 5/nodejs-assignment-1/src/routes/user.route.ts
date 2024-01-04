import { Router } from 'express';

import {
  // create,
  getAll,
  getById,
  // update,
  // remove,
} from '../controllers/user.controller';
import { validateReqQuery } from '../middlewares/validator.middleware';
import { queryUserSchema } from '../schemas/user.schema';
// import { validateReqBody } from '../middlewares/validator.middleware';
// import { updateUserSchema } from '../schemas/user.schema';

const router = Router();

// router.post('/', create);

router.get('/', validateReqQuery(queryUserSchema), getAll);

router.get('/:id', getById);

// router.patch('/:id', validateReqBody(updateUserSchema), update);

// router.delete('/:id', remove);

export default router;
