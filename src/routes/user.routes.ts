import { Router } from 'express'
import { verifySession } from '../middleware/passport'
import { getListUsers, getUserByToken, updateUserInfo } from '../controllers/users.controller'

const router = Router()

router.use([verifySession])

router.get('/', getListUsers);
router.get('/profile', getUserByToken);
router.put('/', updateUserInfo);

export default router;