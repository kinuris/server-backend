import { Field, Float, InputType } from "type-graphql";

@InputType()
export class FoodVariantsInput {
    @Field(type => String)
    name: string

    @Field(type => Float)
    price: number
}