import { Router } from 'express'
import { verifySession } from '../middleware/passport.js'
import { validate } from '../middleware/validation.js'
import {
    getAllExercises,
    getExercise
} from '../controllers/exercises.controllers.js';

const router = Router()

router.get('/', [verifySession], getAllExercises);

router.get('/:exerciseId', [verifySession], getExercise);

export default router
