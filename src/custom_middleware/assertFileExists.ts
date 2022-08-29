import { Request, Response, NextFunction } from "express";
import path from "path"
import fs from "fs"

/**
 * @deprecated Edit server configurations instead
*/
export function assertFileExists(req: Request, res: Response, next: NextFunction): void {
    const name = req.params["name"]
    const directory = req.params["directory"]
    const file = req.params["file"]

    if (!fs.existsSync(path.join(__dirname, "sites", name, directory, file))) {
        res.status(404)
        res.sendFile(path.join(__dirname, "sites", "default", "doesnotexist.html"))
        return
    }

    next()
}