import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cep } from "../value-objects/Cep";
import { HouseNumber } from "../value-objects/HouseNumber";
import { User } from "./User";
import { Order } from "./Order";

export interface AddressProps {
    id?: number;
    cep: Cep;
    street: string;
    district: string;
    number: HouseNumber;
    reference: string | null;
    complement: string | null;
}

@Entity('addresses')
export class Address {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column(() => Cep, {prefix: false})
    public cep!: Cep;

    @Column()
    public street!: string;

    @Column()
    public district!: string;

    @Column(() => HouseNumber, {prefix: false})
    public number!: HouseNumber;

    @Column({ type: 'text', nullable: true })
    public reference!: string | null;

    @Column({ type: 'text', nullable: true })
    public complement!: string | null;

    @ManyToOne(() => User, (user) => user.addresses)
    public user!: User;

    @OneToMany(() => Order, (order) => order.address)
    public orders!: Order[];

    constructor(props?: AddressProps) {
        
        if (props) {
            Object.assign(this, props);
        }
    }
}