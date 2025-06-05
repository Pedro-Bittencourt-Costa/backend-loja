import { Cpf } from "../value-objects/Cpf";
import { Name } from "../value-objects/Name";
import { Email } from "../value-objects/Email";
import { Telephone } from "../value-objects/telephone";
import { HashedPassword } from "../value-objects/HashedPassword";

export interface UserProps {
    id?: number;
    cpf: Cpf;
    name: Name;
    email: Email;
    telephone: Telephone;
    hashedPassword: HashedPassword;
}

export class User {

    private id: number | null;
    private cpf: Cpf;
    private name: Name;
    private email: Email;
    private telephone: Telephone;
    private hashedPassword: HashedPassword;
    
    constructor(props: UserProps) {
        this.id = props.id? props.id : null;
        this.name = props.name;
        this.cpf = props.cpf;
        this.email = props.email;
        this.telephone = props.telephone; 
        this.hashedPassword = props.hashedPassword;
    }
}