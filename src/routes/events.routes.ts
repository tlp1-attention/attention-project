import { Router } from 'express'
import { verifySession } from '../middleware/passport'
import { validate } from '../middleware/validation'
import {
    createEvent,
    deleteEvent,
    updateUserEvent,
    getEventsByUser,
} from '../controllers/events.controllers'
import { createEventSchema, updateEventSchema } from '../schemas/event.schema'

const router = Router()

router.get('/', [verifySession], getEventsByUser)
router.post('/', [verifySession], 
    validate(createEventSchema), 
    createEvent
)
router.put(
    '/:eventId',
    [verifySession],
    validate(updateEventSchema),
    updateUserEvent
)
router.delete('/:eventId', [verifySession], deleteEvent)

export default router
