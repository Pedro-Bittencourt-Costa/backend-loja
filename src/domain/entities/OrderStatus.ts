import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_status')
export class OrderStatus {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public description!: string;

}