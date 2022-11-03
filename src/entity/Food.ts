import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, Relation } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { FoodVariants } from "./FoodVariants"

@ObjectType()
@Entity({ name: "items" })
export class Food extends BaseEntity {
    @Field(() => ID, { name: 'itemID' })
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    itemID: string

    @Field({ name: 'name' })
    @Column('text', { name: 'name' })
    name: string

    @Field({ name: 'imageLink' })
    @Column({ name: 'img_link' })
    imageLink: string

    @Field({ name: 'category' })
    @Column({ length: 1, name: 'category' })
    category: string
    
    @Field(type => [FoodVariants], { name: 'variants' })
    @OneToMany(() => FoodVariants, (foodVariant) =>  foodVariant.foodID)
    variants: Relation<FoodVariants>[]
}