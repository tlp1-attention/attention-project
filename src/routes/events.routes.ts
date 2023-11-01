import { Router } from 'express'
import { verifySession } from '../middleware/passport'
import { validate } from '../middleware/validation'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser,
    getEventById,
    getEventCountByWeeks,
} from '../controllers/events.controllers'
import {
    createEventSchema,
    deleteEventSchema,
    getEventsSchema,
    updateEventSchema,
} from '../schemas/event.schema'
import { ValidationChain } from 'express-validator'

const router = Router()

router.get('/', [verifySession], validate(getEventsSchema), getEventsByUser)
router.get('/by-week', [verifySession], getEventCountByWeeks)
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
