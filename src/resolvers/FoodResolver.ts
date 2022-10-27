import { Context } from "apollo-server-core";
import { Request, Response } from "express";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql"
import { Food } from "../entity/Food";
import { FoodVariants } from "../entity/FoodVariants";
import { deleteFoods } from "./inputs/composites/deleteFoodsArg";
import jwt from "jsonwebtoken"

@Resolver(Food)
export class FoodResolver {
    @Query(returns => [Food])
    async fetchAll() {
        return await Food.find({
            relations: {
                variants: true
            }
        })
    }

    @Mutation(returns => [Food], { nullable: true })
    async deleteFoods(@Ctx() ctx: Context<{ req: Request, res: Response }>, @Arg("food") foods: deleteFoods) {
        const { req } = ctx

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
        
        const { foods: foodsToDelete } = foods
        
        const deleteFoods = await Promise.all(foodsToDelete.map(async foodInput => {
            const food = await Food.findOne({
                where: {
                    name: foodInput.name,
                    category: foodInput.category
                },
                relations: {
                    variants: true
                }
            })
            
            if (food === null) {
                return 0
            }

            await FoodVariants.remove(food.variants)

            return food
        }))

        if (deleteFoods.includes(0)) {
            return null
        }

        return await Food.remove(deleteFoods as Food[])
    }
}