import {
    loginController,
    registerController,
    changePasswordController,
    logoutController,
    getUserInfo,
    updateUserInfo,
} from '../controllers/auth.controller'
import { Router } from 'express'
import { validate } from '../middleware/validation'
import {
    changePasswordSchema,
    createUserSchema,
    loginUserSchema,
} from '../schemas/user.schema'

const router = Router()

router.get('/user/info', getUserInfo)
router.put('/user/info', updateUserInfo)
router.post('/register', validate(createUserSchema), registerController)
router.post('/login', validate(loginUserSchema), loginController)
router.post(
    '/change-password/',
    validate(changePasswordSchema),
    changePasswordController
)
router.get('/log-out', logoutController)

export default router
