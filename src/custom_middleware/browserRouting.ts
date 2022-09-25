import { NextFunction, Request, Response } from "express";

export function browserRouting(name: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.params["name"] === name) {
            req.body["should_browser_route"] = true
        }

        next()
    }
}