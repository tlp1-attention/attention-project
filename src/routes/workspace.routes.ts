import { Router } from 'express'
import { renderTimer, renderEvents } from '../controllers/workspace.controller' 
import validateJWT from '../middleware/validate_jwt';

const router = Router();

router.get('/workspace/timer', [validateJWT], renderTimer);
router.get('/workspace/events', [validateJWT], renderEvents);

export default router;