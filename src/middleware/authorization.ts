import { Request, Response, NextFunction } from "express";
import { AppRoles, AppRolesId } from "../models/roles";

/**
 * Middleware that checks if the user is an admin
 * and if it is, it allows the request to continue.
 * If not, it returns a 403 status code.
 */
export function adminRoute(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        console.log("Request to authorize is not authenticated. Make sure you are using the authentication middleware before this one.");
        return res.status(403).send({
            message: "Unauthorized"
        });
    }
    console.log(req.user);
    if (req.user.roleId !== AppRolesId[AppRoles.ADMIN]) {
        return res.status(403).send({
            message: "Unauthorized"
        });
    }

    next();
}
