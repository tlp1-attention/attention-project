import { Request, Response } from "express"

export function renderProfile(req: Request, res: Response) {
    return res.render("profile.ejs", { title: "Profile" })
}