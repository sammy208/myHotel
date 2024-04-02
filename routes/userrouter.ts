import { Router } from 'express';
import { signUp, login } from '../controllers/userControllers.ts';

const router = Router();

router.post('/api/v1/signUp', signUp);
router.post('/api/v1/login', login);

export default router;