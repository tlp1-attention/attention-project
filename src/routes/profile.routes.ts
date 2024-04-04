import { Router } from "express";
import { renderProfile } from "../controllers/profile.controller.js"

const profileRouter = Router()

profileRouter.get('/workspace/user', renderProfile);

export default profileRouter