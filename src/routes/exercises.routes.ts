import { Router } from 'express'
import { verifySession } from '../middleware/passport.js'
import { validate } from '../middleware/validation.js'
import {
    getAllExercises,
    getExercise,
    getQuestionsForExercise,
} from '../controllers/exercises.controllers.js'
import { query } from 'express-validator'

const router = Router()

const queryParam = query('q')
    .optional()
    .isString()
    .withMessage('El parámetro de búsqueda debe ser un string');

router.get('/', [verifySession, queryParam], getAllExercises);

router.get('/:exerciseId', [verifySession], getExercise);

router.get('/:exerciseId/questions', getQuestionsForExercise)

export default router
