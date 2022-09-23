import { Request, Response, NextFunction } from "express";

export function validateSignup(req: Request, res: Response, next: NextFunction): void {
    if (req.body["username"] === '' || req.body["password"] === '' || req.body["email"] === '') {
        res.status(400).end()
        return
    }

    next()
}
