import { Router } from 'express'
import { renderTimer, renderEvents, renderReadingList } from '../controllers/workspace.controller' 

const router = Router();

router.get('/workspace/events' , renderEvents);
router.get('/workspace/timer', renderTimer);
router.get('/workspace/readings', renderReadingList);

export default router;