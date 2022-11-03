import { Field, Float, InputType } from "type-graphql";

@InputType()
export class FoodVariantsInput {
    @Field(type => String, { name: 'name' })
    name: string

    @Field(type => Float, { name: 'price' })
    price: number
}