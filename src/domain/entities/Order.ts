import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MonetaryValue } from "../value-objects/MonetaryValue";
import { MonetaryValueTransformer } from "../value-objects/monetaryValueTransformer";
import { Address } from "./Address";

export interface OrderProps {
    id?: number;
    finalTotalValue: MonetaryValue;
    initialTotalValue: MonetaryValue;
    observation: string;
    creationTime: Date;
    updateTime: Date;
    address: Address;
}

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        name: 'final_total_value',
        type: 'integer',
        transformer: new MonetaryValueTransformer()
    })
    public finalTotalValue!: MonetaryValue;

    @Column({
        name: 'initial_total_value',
        type: 'integer',
        transformer: new MonetaryValueTransformer()
    })
    public initialTotalValue!: MonetaryValue;

    @Column()
    public observation!: string;

    @Column()
    public creationTime!: Date;

    @Column()
    public updateTime!: Date;

    public address!: Address;

    constructor(props?: OrderProps){

        if(props){
            Object.assign(this, props);
        }
    }

}