import { loginController, registerController } from '../controllers/login-register.controller'
import express from 'express'


const router = express.Router()

router.post('/register/', registerController);

router.post('/login/', loginController);

export default router;