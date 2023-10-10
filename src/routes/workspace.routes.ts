import { Router } from 'express'
import { renderTimer, renderEvents, renderReadingList, renderReading } from '../controllers/workspace.controller' 

const router = Router();

router.get('/workspace/events' , renderEvents);
router.get('/workspace/timer', renderTimer);
router.get('/workspace/readings', renderReadingList);
router.get('/workspace/readings/:readingId', renderReading);

export default router;