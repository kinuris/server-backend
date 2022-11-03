import { Field, InputType, Int } from "type-graphql";

@InputType()
export class FoodInput {
    @Field(type => String, { name: 'name' })
    name: string

    @Field(type => String, { name: 'imageLink' })
    imageLink: string

    @Field(type => String, { name: 'category' })
    category: string
}