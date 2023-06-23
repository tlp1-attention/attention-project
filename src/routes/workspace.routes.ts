import { Router } from 'express'
import { renderTimer, renderEvents } from '../controllers/workspace.controller' 
import validateJWT from '../middleware/validate_jwt';

const router = Router();

router.get('/workspace/events', [validateJWT], renderEvents);
router.get('/workspace/timer', [validateJWT], renderTimer);


export default router;