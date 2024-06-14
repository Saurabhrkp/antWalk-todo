import { Router } from 'express';
import { apiLogger } from 'helpers/apiLogger';
import { authentication } from 'middleware';
import auth from './auth';
import todos from './todos';

const router = Router();

router.use(apiLogger);

router.use('/auth', auth);

router.use('/todos', authentication, todos);

export default router;
