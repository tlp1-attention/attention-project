import { loginController, registerController, changePasswordController, logoutController } from '../controllers/auth.controller'
import express from 'express'
import { validate } from '../middleware/validation';
import { changePasswordSchema, createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(createUserSchema), registerController);
router.post('/login', validate(loginUserSchema), loginController);
router.post('/change-password/', validate(changePasswordSchema), changePasswordController);
router.get('/log-out', logoutController);

export default router;