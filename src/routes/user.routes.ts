import { Router } from 'express'
import { verifySession } from '../middleware/passport'
import { getUserByToken } from '../controllers/users.controller'

const router = Router()

router.use([verifySession])

router.get('/', getUserByToken);



export default router;