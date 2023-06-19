import express from 'express'
import { renderTimer } from '../controllers/workspace.controller' 

const router = express.Router();

router.get('/workspace/timer', renderTimer);

export default router;