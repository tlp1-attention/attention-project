import { Router } from 'express'
import validateJWT from '../middleware/validate_jwt'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser
} from '../controllers/events.contollers'

const router = Router();

router.get('/', [validateJWT], getEventsByUser);
router.post('/', [validateJWT], createEvent);
router.put('/', [validateJWT], updateUserEvent);
router.delete('/', [validateJWT], deleteEvent);

export default router;