import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { Food } from "../entity/Food";
import { FoodVariants } from "../entity/FoodVariants";
import { RegisterFoodAndVariants } from "./inputs/composites/registerFoodAndVariants";

@Resolver(FoodVariants)
export class FoodVariantsResolver {
    @Mutation(returns => [FoodVariants])
    async registerFoodAndVariants(@Arg('foodAndVariants') foodAndVariants: RegisterFoodAndVariants) {
        const { food, variants } = foodAndVariants
        const { name, imageLink } = food
        
        const foodItem = new Food()
        foodItem.name = name
        foodItem.imageLink = imageLink

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