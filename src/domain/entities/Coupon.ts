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

    @Column({name: 'valid', default: true})
    public isValid!: boolean

    @OneToMany(() => Order, (order) => order.coupon)
    public orders!: Order[];

    constructor(props?: Coupon) {
        if(props) {
            Object.assign(this, props);
        }
    }
}