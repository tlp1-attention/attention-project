import { Request, Response } from "express"

export function renderPreferencesForm(req: Request, res: Response) {
    return res.render("register-preferences-form.ejs", { title: "Preferencias" })
}