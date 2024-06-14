import { Router } from 'express';
import { login, register } from './controller';

const router = Router();

router.post('/register', register);

router.get('/magic-link', login);

export default router;