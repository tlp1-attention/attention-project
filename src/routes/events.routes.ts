import { Router } from 'express'
import { validateToken } from '../middleware/validate_jwt'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser
} from '../controllers/events.contollers'

const router = Router();

router.get('/', [validateToken], getEventsByUser);
router.post('/', [validateToken], createEvent);
router.put('/', [validateToken], updateUserEvent);
router.delete('/', [validateToken], deleteEvent);

export default router;