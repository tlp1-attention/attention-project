import { Router } from "express";
import { getListUsers } from "../controllers/users.controller";

const router = Router()

router.get("/", getListUsers)

export default router