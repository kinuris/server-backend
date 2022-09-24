import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function lockName(name: string, location: string, options: RedirectOption = {}) {
    const urlEncoded = options.alertMessage === undefined ? "" : `?alertmsg=${encodeURIComponent(options.alertMessage)}`
    const redirectLocation = location + urlEncoded

    return function (req: Request, res: Response, next: NextFunction) {
        if (req.params["name"] === name) {
            if (req.body["auth_token"]) {
                try {
                    jwt.verify(req.body["auth_token"], process.env.SECRET)
                } catch (error) {
                    res.clearCookie("auth_token")
                    res.redirect(redirectLocation)
                    return
                }

                next()
                return
            } else {
                res.redirect(redirectLocation)
                return
            }
        }

        next()
    }
}