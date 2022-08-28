import { Request, Response, NextFunction } from "express";
import path from "path"

export function assertDirectoryThenFile(req: Request, res: Response, next: NextFunction): void {
    if (req.params["directory"] && !req.params["file"]) {
        res.status(403).sendFile(path.join(__dirname, "sites", "forbidden.html"))
        res.end()
        return
    }

    next()
}