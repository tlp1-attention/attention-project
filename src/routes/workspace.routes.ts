import { Router } from 'express'
import { renderTimer } from '../controllers/workspace.controller' 
import { renderEvents } from '../controllers/events.contollers';

const router = Router();

router.get('/workspace/timer', renderTimer);
router.get('/workspace/events', renderEvents);

export default router;