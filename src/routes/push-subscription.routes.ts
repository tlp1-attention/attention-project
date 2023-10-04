import { createSubscription, sendPublicKey, deleteSubscription } from "../controllers/push-subscriber.controller";
import { Router } from 'express';
import { verifySession } from "../middleware/passport";

const router = Router();

router.post('/subscription', [verifySession], createSubscription);
router.get('/vapid-key', [verifySession], sendPublicKey);
router.delete('/subscription', [verifySession], deleteSubscription);

export default router;