import { Router } from 'express'
import { verifySession } from '../middleware/passport'
import { validate } from '../middleware/validation'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser,
    getEventById,
} from '../controllers/events.controllers'
import {
    createEventSchema,
    deleteEventSchema,
    updateEventSchema,
} from '../schemas/event.schema'

const router = Router()

router.get('/', [verifySession], getEventsByUser)
router.get('/:eventId', [verifySession], getEventById)
router.post('/', [verifySession], validate(createEventSchema), createEvent)
router.put(
    '/:eventId',
    [verifySession],
    validate(updateEventSchema),
    updateUserEvent
)
router.delete(
    '/:eventId',
    validate(deleteEventSchema),
    [verifySession],
    deleteEvent
)

export default router
