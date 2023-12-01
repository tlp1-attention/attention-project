import { Router } from 'express';
import { loginWithGoogle } from '../controllers/federated.auth.controller';

const router = Router();

router.post('/auth/google', loginWithGoogle);

export default router;