import { AppDataSource } from "../db/data-source";
import { Order } from "../domain/entities/Order";
import { CrudRepository } from "./CrudRepository";

export class OrderRepository extends CrudRepository<Order> {

    constructor() {
        super(AppDataSource.getRepository(Order));
    }

    
}