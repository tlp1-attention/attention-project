import { Router } from "express";
import { renderProfile } from "../controllers/profile.controller.js"

const profileRouter = Router()

profileRouter.get('/user/profile', renderProfile)

export default profileRouter