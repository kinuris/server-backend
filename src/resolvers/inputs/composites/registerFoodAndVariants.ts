import { Field, InputType } from "type-graphql";
import { FoodInput } from "../FoodInput";
import { FoodVariantsInput } from "../FoodVariantsInput";

@InputType()
export class RegisterFoodAndVariants {
    @Field(type => FoodInput)
    food: FoodInput

    @Field(type => [FoodVariantsInput])
    variants: FoodVariantsInput[]
}