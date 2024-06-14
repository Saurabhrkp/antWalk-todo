import { Router } from 'express';
import { apiLogger } from 'helpers/apiLogger';
import auth from './auth';

const router = Router();

router.use(apiLogger);

router.use('/auth', auth);

export default router;
