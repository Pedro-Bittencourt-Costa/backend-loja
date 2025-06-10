import { Column } from "typeorm";

export class Amount {

    @Column({name: 'amount'})
    public value: number;

    constructor(value: number) {
        this.validateValue(value);
        this.value = value;
    }

    private validateValue(value: number): void {
        if(value <= 0) {
            throw new Error('Valor invalido, o valor deve ser positivo');
        }
    }

    public updateValue(value: number): void {
        this.validateValue(value);
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }
}