import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('coupons')
export class Coupon {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public percentage!: number;

    @Column({unique: true})
    public description!: string;
}