import { Field, InputType } from "type-graphql";
import { FoodInput } from "../FoodInput";

@InputType()
export class deleteFoods {
    @Field(type => [FoodInput])
    foods: FoodInput[]
}