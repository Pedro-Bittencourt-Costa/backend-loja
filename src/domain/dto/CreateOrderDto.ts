import { CreateOrderItemDto } from "./CreateOrderItemDto";

export class CreateOrderDto {
    userId!: number;
    addressId!: number;
    paymentMethodId!: number;
    items!: CreateOrderItemDto[];
    couponDescription?: string;
    observation?: string;
}