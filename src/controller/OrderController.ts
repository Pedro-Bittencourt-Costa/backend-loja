import { CreateOrderDto } from "../domain/dto/CreateOrderDto";
import { ResponseOrderDto } from "../domain/dto/ResponseOrderDto";
import { Order } from "../domain/entities/Order";
import { OrderService } from "../service/OrderService";
import { Request, Response } from "express";
import { CrudController } from "./CrudController";

export class OrderController extends CrudController<Order, ResponseOrderDto, CreateOrderDto, CreateOrderDto >{

    constructor(protected readonly service: OrderService){
        super(service);
    }

    async findAllByUser(req: Request, res: Response): Promise<Response> {
    
            const queryKeys = Object.keys(req.query);
            const id  = parseInt(req.params.id);
    
            const invalidParams = queryKeys.filter(key => key !== 'relations');
    
            if (invalidParams.length > 0) {
                return res.status(400).json({
                    message: `invalid parameters: ${invalidParams.join(', ')}`
                });
            }
    
            const relationsArray = this.findRelations(req);
            const items = await this.service.findAllByUser(id, relationsArray);
            return res.status(200).json(items);
        }

}