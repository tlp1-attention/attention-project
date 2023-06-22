import { loginController, registerController, changePasswordController } from '../controllers/auth.controller'
import express from 'express'

const router = express.Router();

router.post('/register/', registerController);
router.post('/login/', loginController);
router.post('/change-password/', changePasswordController);

export default router;