import { Context } from "apollo-server-core";
import { Request, Response } from "express";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql"
import { Food } from "../entity/Food";
import { FoodVariants } from "../entity/FoodVariants";
import { RegisterFoodAndVariants } from "./inputs/composites/registerFoodAndVariants";

import jwt from "jsonwebtoken"

@Resolver(FoodVariants)
export class FoodVariantsResolver {
    @Mutation(returns => [FoodVariants], { nullable: true })
    async registerFoodAndVariants(@Ctx() context: Context<{ req: Request, res: Response }>, @Arg('foodAndVariants') foodAndVariants: RegisterFoodAndVariants) {
        const { req } = context

        if(!process.env.DISABLE_AUTH) {
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
    
            if(!decodedPayload["admin"]){
                return null
            }
        }
        
        const { food, variants } = foodAndVariants
        const { name, imageLink, category } = food
        
        const foodItem = new Food()
        foodItem.name = name
        foodItem.imageLink = imageLink
        foodItem.category = category

        await foodItem.save()

        return await Promise.all(variants.map(async variant => {
            const { name, price } = variant
            const variantItem = new FoodVariants()
            variantItem.variantName = name
            variantItem.price = price
            variantItem.foodID = foodItem

            return await variantItem.save()
        }))
    }

    @Query(returns => [FoodVariants])
    async fetchAllVariants() {
        return await FoodVariants.find({
            relations: {
                foodID: true
            }
        })
    }
}