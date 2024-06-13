import { Router } from 'express';
import { apiLogger } from 'middlewares/apiLogger';

const router = Router();

router.use(apiLogger);


export default router;
