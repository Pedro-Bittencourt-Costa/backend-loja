import { AppDataSource } from "../db/data-source";
import { OrderStatus } from "../domain/entities/OrderStatus";

export class PaymentMethodRepository {

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