import { NextFunction, Request, Response } from "express";

export function staticRouting(name: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.params["name"] !== name) {
            next()
            return
        }

        req.body["should_static_route"] = true
        next()
    }
}