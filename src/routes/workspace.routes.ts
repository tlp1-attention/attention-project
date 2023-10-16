import { Router } from 'express'
import { renderTimer, renderEvents } from '../controllers/workspace.controller' 

const router = Router();

router.get('/workspace/events' , renderEvents);
router.get('/workspace/timer', renderTimer);

export default router;