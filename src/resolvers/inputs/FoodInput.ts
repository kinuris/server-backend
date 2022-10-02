import { Field, InputType, Int } from "type-graphql";

@InputType()
export class FoodInput {
    @Field(type => String)
    name: string

    @Field(type => String)
    imageLink: string
}