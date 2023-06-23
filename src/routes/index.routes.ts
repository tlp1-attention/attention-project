import express from 'express'
import { renderIndex, renderIndexWithAuth} from '../controllers/index.controller'
import validateJWT from '../middleware/validate_jwt'

const router = express.Router();

router.get(['/', '/index.html'], [validateJWT], renderIndexWithAuth);
router.get( ['/', '/index.html'], renderIndex);


export default router;