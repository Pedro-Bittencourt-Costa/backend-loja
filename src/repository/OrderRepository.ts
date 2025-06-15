import { FindManyOptions } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { Order } from "../domain/entities/Order";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";

export interface IOrderRepository extends ICrudRepository<Order> {
    findAllByUser(userId: number, relations?: string[]): Promise<Order[]>;
}

export class OrderRepository extends CrudRepository<Order> implements IOrderRepository {

    constructor() {
        super(AppDataSource.getRepository(Order));
    }

    findAllByUser(userId: number, relations?: string[]): Promise<Order[]> {
        const options: FindManyOptions<Order> = {}
        options.relations = relations;
        return this.repository.find({
            where: { id: userId},
            ...options
        });
           
    }
    
}