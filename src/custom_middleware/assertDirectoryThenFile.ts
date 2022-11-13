import { Request, Response, NextFunction } from "express";
import path from "path"

export function assertDirectoryThenFile(req: Request, res: Response, next: NextFunction): void {
    if (req.params["directory_or_file"] && !req.params["file"]) {

        if (req.params["directory_or_file"].split('.').length >= 2) {
            res.sendFile(path.join(__dirname, "sites", req.params["name"], req.params["directory_or_file"]))
            return
        } else {
            if (req.body["should_browser_route"]) {
                res.sendFile(path.join(__dirname, "sites", req.params["name"], "index.html"))
                return
            } else if (req.body["should_static_route"]) {
                res.sendFile(path.join(__dirname, "sites", req.params["name"], req.params["directory_or_file"], "index.html"))
                return
            } else {
                res.status(403).sendFile(path.join(__dirname, "sites", "default", "forbidden.html"))
                return
            }
        }
    }

    next()
}