import { loginController, registerController, changePasswordController } from '../controllers/auth.controller'
import { Router } from 'express'
import { validate } from '../middleware/validation';
import { changePasswordSchema, createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = Router();

router.post('/register', validate(createUserSchema), registerController);
router.post('/login', validate(loginUserSchema), loginController);
router.post('/change-password/', validate(changePasswordSchema), changePasswordController);

export default router;