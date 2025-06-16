import { Address } from "../entities/Address";
import { Order } from "../entities/Order";
import { Permissions } from "../entities/Permissions";
import { User } from "../entities/User";

export class ResponseUserDto {

    public id!: number;
    public cpf!: string;
    public firstName!: string;
    public surname!: string;
    public email!: string;
    public telephone!: string;
    public addresses?: Address[];
    public permissions?: Permissions[];
    public orders?: Order[];

    constructor(user: User) {
        this.id = user.id;
        this.cpf = user.cpf.value;
        this.firstName = user.firstName;
        this.surname = user.surname;
        this.email = user.email.value;
        this.telephone = user.telephone.value;
        this.addresses = user.addresses;
        this.permissions = user.permissions;
        this.orders = user.orders;
    }
}