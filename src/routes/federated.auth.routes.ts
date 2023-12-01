import { Router } from 'express';
import { loginWithGoogle } from '../controllers/federated.auth.controller';
import { checkGoogleEnabledMiddleware } from '../middleware/check.google.enabled.middleware';

const router = Router();

router.use([checkGoogleEnabledMiddleware]);

router.post('/auth/google', loginWithGoogle);

export default router;