import { Column, Entity, BaseEntity, ManyToOne, PrimaryColumn, JoinColumn, Relation } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { Food } from "./Food"

@ObjectType()
@Entity({ name: "item_variants" })
export class FoodVariants extends BaseEntity {
    @Field(() => Food, { name: 'foodID' })
    @ManyToOne(() => Food, (food) => food.variants)
    @JoinColumn({ name: 'item_id' })
    @PrimaryColumn({ name: 'item_id', type: 'uuid' })
    foodID: Relation<Food>

    @Field({ name: 'variantName' })
    @PrimaryColumn({ name: 'variant_name' })
    variantName: string

    @Field({ name: 'price' })
    @Column({ name: 'price' })
    price: number
}