import { ResponseOrderItemDto } from "./ResponseOrderItemDto";

export class ResponseOrderDto {
    id!: number;
    status!: string;
    paymentMethod!: string;
    initialTotalValue!: number;
    finalTotalValue!: number;
    coupon?: { description: string, percentage: number };
    items!: ResponseOrderItemDto[];
    creationTime!: Date;
}