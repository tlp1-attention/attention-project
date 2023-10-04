import { Router } from 'express'
import {
    registerPreferences,
    getPreferencesByUser,
    updatePreferenceForUser,
    deletePreferences,
} from '../controllers/preferences.controller'
import { verifySession } from '../middleware/passport'

const router = Router()

const userRoute = [verifySession]

router.get('/', userRoute, getPreferencesByUser)
router.post('/', userRoute, registerPreferences)
router.put('/', userRoute, updatePreferenceForUser)
router.delete('/', userRoute, deletePreferences)

export default router;