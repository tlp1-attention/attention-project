import { loginController, registerController, changePasswordController, logoutController } from '../controllers/auth.controller'
import express from 'express'

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/change-password/', changePasswordController);
router.get('/log-out', logoutController);

export default router;