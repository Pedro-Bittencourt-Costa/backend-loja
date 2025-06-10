import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('permissions')
export class Permissions {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public description!: string;

    @ManyToMany(() => User, (user) => user.permissions)
    public users!: User[];

}