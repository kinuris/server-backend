import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, Relation } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { FoodVariants } from "./FoodVariants"

@ObjectType()
@Entity({ name: "items" })
export class Food extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    itemID: string

    @Field()
    @Column('text')
    name: string

    @Field()
    @Column({ name: "img_link" })
    imageLink: string

    @Field()
    @Column({ length: 1 })
    category: string
    
    @Field(type => [FoodVariants])
    @OneToMany(() => FoodVariants, (foodVariant) =>  foodVariant.foodID)
    variants: Relation<FoodVariants>[]
}