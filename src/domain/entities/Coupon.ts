import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity('coupons')
export class Coupon {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public percentage!: number;

    @Column({unique: true})
    public description!: string;

    @OneToMany(() => Order, (order) => order.coupon)
    public orders!: Order[];
}