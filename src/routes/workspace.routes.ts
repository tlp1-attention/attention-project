import { Router } from 'express'
import { renderTimer, renderEvents, renderReadingList, renderReading, renderQuiz, renderReport } from '../controllers/workspace.controller' 

const router = Router();

router.get('/workspace/events' , renderEvents);
router.get('/workspace/timer', renderTimer);
router.get('/workspace/readings', renderReadingList);
router.get('/workspace/readings/:readingId', renderReading);
router.get('/workspace/readings/:readingId/quiz', renderQuiz);
router.get('/workspace/report', renderReport);

export default router;