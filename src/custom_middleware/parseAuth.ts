import { NextFunction, Request, Response } from "express";

export function parseAuth(req: Request, res: Response, next: NextFunction) {
    if (req.header("Cookie")) {
        const [name, value] = req.header("Cookie").split("=")
        if (name === "auth_token") {
            req.body["auth_token"] = value
        }
    }

    next()
}