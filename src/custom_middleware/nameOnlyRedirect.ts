import { Request, Response, NextFunction } from "express";
import path from "path"
 
export function nameOnlyRedirect(req: Request, res: Response, next: NextFunction): void {
    if (!req.params["directory_or_file"] && !req.params["file"]) {
        res.sendFile(path.join(__dirname, "sites", req.params["name"], "index.html"), () => {
            res.redirect(404, "/not_found.html")
        })

        return
    }

    next()
}
