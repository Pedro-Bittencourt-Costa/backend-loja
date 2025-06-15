import { AppDataSource } from "../db/data-source";
import { Order } from "../domain/entities/Order";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";

export interface IOrderRepository extends ICrudRepository<Order> {

}

export class OrderRepository extends CrudRepository<Order> implements IOrderRepository {

    constructor() {
        super(AppDataSource.getRepository(Order));
    }

    
}