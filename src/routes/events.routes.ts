import { Router } from 'express'
import { verifySession } from '../middleware/passport'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser
} from '../controllers/events.contollers'

const router = Router();

router.get('/', [verifySession], getEventsByUser);
router.post('/', [verifySession], createEvent);
router.put('/', [verifySession], updateUserEvent);
router.delete('/', [verifySession], deleteEvent);

export default router;