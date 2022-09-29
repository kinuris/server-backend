import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid", { name: "user_id" })
    userID: string

    @Field()
    @Column('text')
    email: string

    @Field()
    @Column('text')
    password: string

    @Field()
    @Column('varchar', {
        length: 20
    })
    username: string

    @Field()
    @Column('boolean')
    admin: boolean

    @Field()
    @Column({ name: "profile_img_link" })
    profileImageLink: string
}