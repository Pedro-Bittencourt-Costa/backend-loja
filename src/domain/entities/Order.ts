import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MonetaryValue } from "../value-objects/MonetaryValue";
import { MonetaryValueTransformer } from "../value-objects/monetaryValueTransformer";
import { Address } from "./Address";
import { OrderItem } from "./OrderItem";
import { User } from "./User";
import { Coupon } from "./Coupon";
import { PaymentMethod } from "./PaymentMethod";
import { OrderStatus } from "./OrderStatus";

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

    @Column({ type: 'text', nullable: true })
    public observation!: string | null;

    @Column()
    public creationTime!: Date;

    @Column()
    public updateTime!: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    public orderItems!: OrderItem[];

    @ManyToOne(() => User, (user) => user.orders)
    public user!: User;

    @ManyToOne(() => Address, (address) => address.orders)
    public address!: Address;

    @ManyToOne(() => OrderStatus, { eager: true })  
    public status!: OrderStatus;

    @ManyToOne(() => PaymentMethod, { eager: true })
    public paymentMethod!: PaymentMethod;

    @ManyToOne(() => Coupon, { nullable: true, eager: true })
    public coupon!: Coupon | null;


    constructor(props?: OrderProps){

        if(props){
            Object.assign(this, props);
        }
    }

}