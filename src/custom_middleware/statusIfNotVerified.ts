import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

export function statusIfNotVerified(status: number, message: string = "") {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.body["auth_token"]) {
            try {
                const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                req.body["user_id"] = (result as jwt.JwtPayload)["id"]
            } catch (error) {
                res.clearCookie("auth_token")
                res.status(status).send(message).end()
                return
            }
        } else {
            res.status(status).send(message).end()
            return
        }

        next()
    }
}