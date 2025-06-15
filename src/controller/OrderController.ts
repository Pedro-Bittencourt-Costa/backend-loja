import { CreateOrderDto } from "../domain/dto/CreateOrderDto";
import { ResponseOrderDto } from "../domain/dto/ResponseOrderDto";
import { Order } from "../domain/entities/Order";
import { OrderService } from "../service/OrderService";
import { CrudController } from "./CrudController";

export class OrderController extends CrudController<Order, ResponseOrderDto, CreateOrderDto, CreateOrderDto >{

    constructor(protected readonly service: OrderService){
        super(service);
    }

}