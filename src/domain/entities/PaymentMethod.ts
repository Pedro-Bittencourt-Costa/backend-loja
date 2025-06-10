import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_methods')
export class PaymentMethod {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public description!: string;
}