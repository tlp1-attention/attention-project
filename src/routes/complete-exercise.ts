import { Router } from 'express'
import {
    createCompleteExercise,
    deleteCompleteExercise,
    getCompletedExercise,
    getCompletedExercisesByUser,
    updateUserCompleteExercise,
} from '../controllers/complete-exercises.controller'
import { verifySession } from '../middleware/passport'
import { validate } from '../middleware/validation'
import {
    createCompletedSchema,
    deleteCompletedSchema,
    updateCompletedSchema,
} from '../schemas/complete-exercise.schema'
const router = Router()

router.use([verifySession])

router.get('/', getCompletedExercisesByUser)

router.get('/:completedId', getCompletedExercise)

router.post('/', validate(createCompletedSchema), createCompleteExercise)

router.put(
    '/:completedId',
    validate(updateCompletedSchema),
    updateUserCompleteExercise
)

router.delete(
    '/:completedId',
    validate(deleteCompletedSchema),
    deleteCompleteExercise
)

export default router;
