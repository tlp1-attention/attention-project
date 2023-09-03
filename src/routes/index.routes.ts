import express from 'express'
import { renderIndex } from '../controllers/index.controller'
import { verifySession } from '../middleware/validate_jwt'

const router = express.Router();

router.get( ['/', '/index.html'], [verifySession], renderIndex);

export default router;