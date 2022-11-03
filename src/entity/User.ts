import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
    @Field(() => ID, { name: 'userID' })
    @PrimaryGeneratedColumn("uuid", { name: "user_id" })
    userID: string

    @Field({ name: 'email' })
    @Column('text', { name: 'email' })
    email: string

    @Field({ name: 'password' })
    @Column('text', { name: 'password' })
    password: string

    @Field({ name: 'username' })
    @Column('varchar', {
        length: 20,
        name: 'username'
    })
    username: string

    @Field({ name: 'admin' })
    @Column('boolean', { name: 'admin' })
    admin: boolean

    @Field({ name: 'profileImageLink' })
    @Column({ name: "profile_img_link" })
    profileImageLink: string
}