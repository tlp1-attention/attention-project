import { Router } from "express";
import { renderPreferencesForm } from "../controllers/preferences.render.js"

const preferenceFormRouter = Router()

preferenceFormRouter.get('/preferences/form', renderPreferencesForm)


export default preferenceFormRouter