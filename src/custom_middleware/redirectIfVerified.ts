import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

export function redirectIfVerified(location: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.body["auth_token"]) {
            try {
                const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                console.log(result)
            } catch (error) {
                res.redirect(location)
                return
            }
        } else {
            res.redirect(location)
            return
        }

        next()
    }
}