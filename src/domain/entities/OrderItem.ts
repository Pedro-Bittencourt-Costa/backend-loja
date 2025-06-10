import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MonetaryValue } from "../value-objects/MonetaryValue";
import { MonetaryValueTransformer } from "../value-objects/monetaryValueTransformer";

@Entity('Order_items')
export class OrderItem {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        name: 'final_value',
        type: 'integer',
        transformer: new MonetaryValueTransformer()
    })
    public finalValue!: MonetaryValue;

    @Column({
        name: 'initial_value',
        type: 'integer',
        transformer: new MonetaryValueTransformer()
    })
    public initialValue!: MonetaryValue;

    public observation!: string;
}