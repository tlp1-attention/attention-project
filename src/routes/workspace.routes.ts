import express from 'express'
import { renderTimer } from '../controllers/workspace.controller' 
import { renderEvents } from '../controllers/events.contollers';
import validateJWT from '../middleware/validate_jwt'

const router = express.Router();

router.get('/workspace/timer', renderTimer);
router.get('/workspace/events', renderEvents);

export default router;