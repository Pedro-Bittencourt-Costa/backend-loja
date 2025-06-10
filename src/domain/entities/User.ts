import { Cpf } from "../value-objects/Cpf";
import { Name } from "../value-objects/Name";
import { Email } from "../value-objects/Email";
import { HashedPassword } from "../value-objects/HashedPassword";
import { Telephone } from "../value-objects/Telephone";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface UserProps {
    id?: number;
    cpf: Cpf;
    name: Name;
    email: Email;
    telephone: Telephone;
    hashedPassword: HashedPassword;
}

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column(() => Cpf, {prefix: false})
    public cpf!: Cpf;

    @Column(() => Name, {prefix: false})
    public name!: Name;

    @Column(() => Email, {prefix: false})
    public email!: Email;

    @Column(() => Telephone, {prefix: false})
    public telephone!: Telephone;

    @Column(() => HashedPassword, {prefix: false})
    public hashedPassword!: HashedPassword;
    
    constructor(props?: UserProps) {
        if (props) {
            Object.assign(this, props);
        }
    }
}