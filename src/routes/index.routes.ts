import express from 'express'
import { renderIndex } from '../controllers/index.controller'

const router = express.Router();

router.get( ['/', '/index.html'], renderIndex);

export default router;