import { Router } from 'express'
import { verifySession } from '../middleware/passport.js'
import { validate } from '../middleware/validation.js'
import {
    getAllExercises,
    getExercise,
    getQuestionsForExercise
} from '../controllers/exercises.controllers.js';

const router = Router()

router.get('/', [verifySession], getAllExercises);

router.get('/:exerciseId', [verifySession], getExercise);

router.get('/:exerciseId/questions', getQuestionsForExercise)


export default router
