import { Column } from "typeorm";
import { BadRequestError } from "../exception/BadRequestError";

export class Amount {

    @Column({name: 'amount'})
    public value: number;

    constructor(value: number) {
        this.validateValue(value);
        this.value = value;
    }

    private validateValue(value: number): void {
        if(value <= 0) {
            throw new BadRequestError('Valor invalido, o valor deve ser positivo');
        }
    }

    subtract(quantity: number): Amount {
        if (this.value < quantity) throw new BadRequestError("Insufficient stock");
        return new Amount(this.value - quantity);
    }

    public getValue(): number {
        return this.value;
    }
}