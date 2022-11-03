import jwt from "jsonwebtoken"
import { Context } from "apollo-server-core";
import { Request, Response } from "express";
import { Resolver, Query, Ctx, Arg } from "type-graphql"
import { User } from "../entity/User";

@Resolver(User)
export class UserResolver {
    @Query(returns => Boolean)
    async isAvailableUsername(@Arg("username") username: string) {
        const user = await User.findOne({
            where: {
                username
            }
        })

        return user ? false : true
    }

    @Query(returns => Boolean)
    async isAvailableEmail(@Arg("email") email: string) {
        const user = await User.findOne({
            where: {
                email
            }
        })

        return user ? false : true
    }

    @Query(returns => User, { nullable: true })
    async getUserData(@Ctx() context: Context<{ req: Request, res: Response }>) {
        const { req } = context

        if(req.body["auth_token"]) {
            try {
                jwt.verify(req.body["auth_token"], process.env.SECRET)
            } catch (error) {
                return null
            }
        } else {
            return null
        }

        const decodedPayload = jwt.decode(req.body["auth_token"]) as jwt.JwtPayload

        return await User.findOne({
            where: {
                userID: decodedPayload["id"]
            }
        })
    }
}