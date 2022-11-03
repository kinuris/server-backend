import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function lockNameReversed(name: string, location: string, options: RedirectOption = {}) {
    const urlEncoded = options.alertMessage === undefined ? "" : `?alertmsg=${encodeURIComponent(options.alertMessage)}`
    const redirectLocation = location + urlEncoded

    return function (req: Request, res: Response, next: NextFunction) {
        if (req.params["name"] === name) {
            if (req.body["auth_token"]) {
                try {
                    const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                    req.body["user_id"] = (result as jwt.JwtPayload)["id"]
                } catch (error) {
                    res.clearCookie("auth_token")
                    next()
                    return
                }
                
                res.redirect(redirectLocation)
                return
            } else {
                next()
                return
            }
        }

        next()
    }
}