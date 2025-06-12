
interface Name {
    first: string;
    surname: string;
}

export class CreateUserDto {
    
    cpf!: string;
    name!: Name;
    email!: string;
    password!: string;
    telephone!: string;

    constructor(props?: CreateUserDto) {
        Object.assign(this, props)
    }
}