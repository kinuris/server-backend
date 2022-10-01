import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity({ name: "menu" })
export class Food extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    userID: string

    @Field()
    @Column('text')
    name: string

    @Field()
    @Column({ name: "img_link" })
    imageLink: string
}