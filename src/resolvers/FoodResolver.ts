import { Resolver, Query } from "type-graphql"
import { Food } from "../entity/Food";

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
}