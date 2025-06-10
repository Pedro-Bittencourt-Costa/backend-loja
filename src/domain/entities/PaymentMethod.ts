import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity('payment_methods')
export class PaymentMethod {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public description!: string;

    @OneToMany(() => Order, (order) => order.paymentMethod)
    public orders!: Order[];
}