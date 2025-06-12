import { Address } from "cluster";
import { Order } from "../entities/Order";
import { Permissions } from "../entities/Permissions";

export class ResponseUserDto {

    private id!: number;
    private cpf!: string;
    private name!: string;
    private surname!: string;
    private email!: string;
    private telephone!: string;
    private addresses?: Address[];
    private permissions?: Permissions[];
    private orders?: Order[];

    constructor(props?: Partial<ResponseUserDto>) {
        Object.assign(this, props)
    }
}