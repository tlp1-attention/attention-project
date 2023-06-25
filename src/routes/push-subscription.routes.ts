import createSubscription from "../controllers/push-subscriber.controller";
import { Router } from 'express';

const router = Router();

router.post('/subscribe', createSubscription);

export default router;