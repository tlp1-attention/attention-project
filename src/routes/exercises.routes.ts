import { Router } from 'express'
import { verifySession } from '../middleware/passport.js'
import { validate } from '../middleware/validation.js'
import {
    createReading,
    getAllExercises,
    getExercise,
    getQuestionsForExercise,
    updateReadingCover,
} from '../controllers/exercises.controllers.js'
import { query } from 'express-validator'
import { adminRoute } from '../middleware/authorization.js'
import { createReadingSchema, updateReadingCoverSchema } from '../schemas/reading.schema.js'

const router = Router()

const queryParam = query('q')
    .optional()
    .isString()
    .withMessage('El parámetro de búsqueda debe ser un string');

router.use([verifySession]);

router.get('/', [queryParam], getAllExercises);

router.get('/:exerciseId', getExercise);

router.get('/:exerciseId/questions', getQuestionsForExercise)

router.post('/', [adminRoute, validate(createReadingSchema)], createReading);

router.post('/:exerciseId/cover', [adminRoute, validate(updateReadingCoverSchema)], updateReadingCover);

export default router
