import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { OrderStatus } from "../domain/entities/OrderStatus";
import { promises } from "dns";

export class OrderStatusRepository{

    constructor(private readonly repository = AppDataSource.getRepository(OrderStatus)){}

    findByDescription(description: string): Promise<OrderStatus | null>{
        return this.repository.findOne({
            where: {
                description: description
            },            
        });
    }

    findById(id: number): Promise<OrderStatus | null> {
        return this.repository.findOne({
            where: { id } as any
        })
    }
}