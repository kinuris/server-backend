import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function lockName(name: string, location: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.params["name"] === name) {
            if (req.body["auth_token"]) {
                try {
                    jwt.verify(req.body["auth_token"], process.env.SECRET)
                } catch (error) {
                    res.redirect(location)
                    return
                }

                next()
                return
            } else {
                res.redirect(location)
                return
            }
        }

        next()
    }
}