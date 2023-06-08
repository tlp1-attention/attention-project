import express from 'express'
import indexController from '../controllers/index.controller'
import { rotate } from 'mathjs';

const router = express.Router();

router.get('/', indexController);

export default router;