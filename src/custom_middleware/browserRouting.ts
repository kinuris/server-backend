import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function browserRouting(name: string, routerOption: RouterOption = {}) {
    const routesAndRedirects = routerOption === undefined ? {} : routerOption

    return function (req: Request, res: Response, next: NextFunction) {
        if(req.params["name"] !== name) {
            next()
            return
        }

        req.body["should_browser_route"] = true

        if (req.params["directory_or_file"] && !req.params["file"] && `/${req.params["directory_or_file"]}` in routesAndRedirects) {
            const { redirect, onFail, adminOnly } = routesAndRedirects[`/${req.params["directory_or_file"]}`]
            
            if(!(`/${req.params["directory_or_file"]}` in routesAndRedirects)) {
                next()
                return
            }

            if (!onFail) {
                if (!req.body["auth_token"]) {
                    next()
                    return
                }

                try {
                    const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                    req.body["user_id"] = (result as jwt.JwtPayload)["id"]
                } catch (error) {
                    res.clearCookie("auth_token")
                    next()
                    return
                }

                res.redirect(redirect)
                return
            }

            if (!req.body["auth_token"]) {
                res.redirect(redirect)
                return
            }

            try {
                const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                req.body["user_id"] = (result as jwt.JwtPayload)["id"]

                if (adminOnly && !(result as jwt.JwtPayload)["admin"]) {
                    res.redirect(redirect)
                    return
                }
            } catch (error) {
                res.clearCookie("auth_token")
                res.redirect(redirect)
                return
            }
            
            next()
            return
        } else if (req.params["directory_or_file"] && req.params["file"] && `/${req.params["directory_or_file"]}/${req.params["file"]}` in routesAndRedirects) {
            const { redirect, onFail, adminOnly } = routesAndRedirects[`/${req.params["directory_or_file"]}/${req.params["file"]}`]

            if (!(`/${req.params["directory_or_file"]}/${req.params["file"]}` in routesAndRedirects)) {
                next()
                return
            }

            if (!onFail) {
                if (!req.body["auth_token"]) {
                    next()
                    return
                }

                try {
                    const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                    req.body["user_id"] = (result as jwt.JwtPayload)["id"]
                } catch (error) {
                    res.clearCookie("auth_token")
                    next()
                    return
                }

                res.redirect(redirect)
                return
            }

            if (!req.body["auth_token"]) {
                res.redirect(redirect)
                return
            }

            try {
                const result = jwt.verify(req.body["auth_token"], process.env.SECRET)
                req.body["user_id"] = (result as jwt.JwtPayload)["id"]

                if (adminOnly && !(result as jwt.JwtPayload)["admin"]) {
                    res.redirect(redirect)
                    return
                }
            } catch (error) {
                res.clearCookie("auth_token")
                res.redirect(redirect)
                return
            }
            
            next()
            return
        }

        next()
    }
}