import { createSubscription, sendPublicKey, deleteSubscription } from "../controllers/push-subscriber.controller";
import { Router } from 'express';
import { validateToken } from "../middleware/validate_jwt";

const router = Router();

router.post('/subscription', [validateToken], createSubscription);
router.get('/vapid-key', [validateToken], sendPublicKey);
router.delete('/subscription', [validateToken], deleteSubscription);

export default router;