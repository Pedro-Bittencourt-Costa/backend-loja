import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Amount } from "../value-objects/Amount";
import { MonetaryValue } from "../value-objects/MonetaryValue";
import { MonetaryValueTransformer } from "../value-objects/monetaryValueTransformer";
import { OrderItem } from "./OrderItem";
import { Category } from "./Category";

export interface ProductProps {
    id?: number;
    photo: string;
    name: string;
    description: string;
    amount: Amount;
    finalValue: MonetaryValue;
    initialValue: MonetaryValue;
}

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public photo!: string;

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column(() => Amount, {prefix: false})
    public amount!: Amount;

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

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    public orderItems!: OrderItem[];

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({name: 'id_category'})
    public category!: Category;

    constructor(props?: ProductProps) {
        
        if (props) {
            Object.assign(this, props);
        }
    }

}