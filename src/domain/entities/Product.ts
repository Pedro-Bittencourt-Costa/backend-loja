import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Amount } from "../value-objects/Amount";
import { MonetaryValue } from "../value-objects/MonetaryValue";
import { MonetaryValueTransformer } from "../value-objects/monetaryValueTransformer";

export interface ProductProps {
    id?: number;
    photo: string;
    name: string;
    description: string;
    amount: Amount;
    finalValue: MonetaryValue;
    initialValue: MonetaryValue;
}

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id!: number | null;

    @Column()
    photo!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column(() => Amount, {prefix: false})
    amount!: Amount;

    @Column({
        name: 'final_value',
        type: 'integer',
        transformer: new MonetaryValueTransformer()
    })
    finalValue!: MonetaryValue;

    @Column({
        name: 'initial_value',
        type: 'integer',
        transformer: new MonetaryValueTransformer()
    })
    initialValue!: MonetaryValue;

    constructor(props?: ProductProps) {
        
        if (props) {
            Object.assign(this, props);
        }
    }

}