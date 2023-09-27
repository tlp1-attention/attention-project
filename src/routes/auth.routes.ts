<<<<<<< HEAD
import { loginController, registerController, changePasswordController } from '../controllers/auth.controller'
=======
import {
    loginController,
    registerController,
    changePasswordController,
    logoutController,
} from '../controllers/auth.controller'
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e
import { Router } from 'express'
import { validate } from '../middleware/validation'
import {
    changePasswordSchema,
    createUserSchema,
    loginUserSchema,
} from '../schemas/user.schema'

const router = Router()

<<<<<<< HEAD
router.post('/register', validate(createUserSchema), registerController);
router.post('/login', validate(loginUserSchema), loginController);
router.post('/change-password/', validate(changePasswordSchema), changePasswordController);
=======
router.post('/register', validate(createUserSchema), registerController)
router.post('/login', validate(loginUserSchema), loginController)
router.post(
    '/change-password/',
    validate(changePasswordSchema),
    changePasswordController
)
router.get('/log-out', logoutController)
>>>>>>> 3e3ad2a0ac375ecd6e01716852e454315afd6c1e

export default router
