import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity('order_status')
export class OrderStatus {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public description!: string;

    @OneToMany(() => Order, (order) => order.status)
    public orders!: Order[];

}