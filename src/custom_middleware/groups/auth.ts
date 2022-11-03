import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { User } from "../../entity/User";
import { validateLogin } from "../validateLogin";
import { validateSignup } from "../validateSignup";

export const signup = [validateSignup, async (req: Request, res: Response) => {
    const user = new User()

    user.password = await bcrypt.hash(req.body["password"], await bcrypt.genSalt(10))
    user.username = req.body["username"]
    user.email = req.body["email"]
    user.admin = false
    user.profileImageLink = req.body["profile_img_link"] ? req.body["profile_img_link"] : ""

    const duplicateEmail = await User.findOne({
        where: {
            email: user.email
        }
    })

    const duplicateUsername = await User.findOne({
        where: {
            username: user.username
        }
    })

    if (duplicateEmail) {
        res.status(401).send("User With That Email Already Exists").end()
        return
    } else if (duplicateUsername) {
        res.status(401).send("User With That Username Already Exists").end()
        return
    }

    try {
        await user.save()
    } catch {
        res.status(500).end()
        return
    }

    res.status(200).end()
}]

export const login = [validateLogin, async (req: Request, res: Response) => {
    const user = await User.findOne({
        where: {
            email: req.body["email"]
        }
    })

    if(!user) {
        res.status(401).send("Wrong email or password").end()
        return
    }
    
    if(await bcrypt.compare(req.body["password"], user.password)) {
        const authToken = jwt.sign({
            id: user.userID,
            admin: user.admin
        }, process.env.SECRET, {
            expiresIn: 3600
        })

        res.setHeader("Set-Cookie", `auth_token=${authToken}`)
        res.status(200).send("Login successful").end()
    } else {
        res.status(401).send("Wrong email or password").end()
    }
}]