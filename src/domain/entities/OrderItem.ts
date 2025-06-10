import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MonetaryValue } from "../value-objects/MonetaryValue";
import { MonetaryValueTransformer } from "../value-objects/monetaryValueTransformer";
import { Product } from "./Product";
import { Order } from "./Order";

export interface OrderItemProps {
    id?: number;
    observation?: string;
    product?: Product;
    order?: Order;
    finalValue: MonetaryValue;
    initialValue: MonetaryValue;
}

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

    @Column({ type: 'text', nullable: true })
    public observation!: string | null;

    @ManyToOne(() => Product, (product) => product.orderItems)
    public product!: Product;

    @ManyToOne(() => Order, (order) => order.orderItems)
    public order!: Order;

    constructor(props?: OrderItemProps){

        if(props) {
            Object.assign(this, props);
        }
    }
}