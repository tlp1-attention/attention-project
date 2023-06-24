import { Router } from 'express'
import { renderTimer, renderEvents } from '../controllers/workspace.controller' 
import { validateToken } from '../middleware/validate_jwt';

const router = Router();

router.get('/workspace/events', [validateToken], renderEvents);
router.get('/workspace/timer', [validateToken], renderTimer);


export default router;