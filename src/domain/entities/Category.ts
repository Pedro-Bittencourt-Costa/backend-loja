import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public description!: string;

    @OneToMany(() => Product, (product) => product.category)
    public products!: Product[];
    
}