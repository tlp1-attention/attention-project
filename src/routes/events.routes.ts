import { Router } from 'express'
import { validateToken } from '../middleware/validate_jwt'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser
} from '../controllers/events.contollers'
import { verifyExistingSession } from '../middleware/passport';

const router = Router();

router.use(verifyExistingSession);

router.get('/', getEventsByUser);
router.post('/', createEvent);
router.put('/', updateUserEvent);
router.delete('/', deleteEvent);

export default router;