import { Request, Response, NextFunction } from "express";
import path from "path"
import fs from "fs"

export function assertFileExists(req: Request, res: Response, next: NextFunction): void {
    const directory = req.params["directory"]
    const file = req.params["file"]

    if (!fs.existsSync(path.join(__dirname, "sites", directory, file))) {
        res.status(404)
        res.sendFile(path.join(__dirname, "sites", "doesnotexist.html"))
        return
    }

    next()
}