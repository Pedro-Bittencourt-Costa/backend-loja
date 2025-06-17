import { CreateOrderDto } from "../domain/dto/CreateOrderDto";
import { ResponseOrderDto } from "../domain/dto/ResponseOrderDto";
import { Coupon } from "../domain/entities/Coupon";
import { Order } from "../domain/entities/Order";
import { OrderItem } from "../domain/entities/OrderItem";
import { OrderStatusEnum } from "../domain/enums/OrderStatusEnum";
import { BadRequestError } from "../domain/exception/BadRequestError";
import { NotFoundError } from "../domain/exception/NotFoundError";
import { MonetaryValue } from "../domain/value-objects/MonetaryValue";
import { IAddressRepository } from "../repository/AddressReposiroy";
import { ICouponRepository } from "../repository/CouponRepository";
import { IOrderRepository } from "../repository/OrderRepository";
import { OrderStatusRepository } from "../repository/OrderStatusRepository";
import { PaymentMethodRepository } from "../repository/PaymentMethodRepository";
import { IProductRepository } from "../repository/ProductRepository";
import { IUserRepository } from "../repository/UserRepository";
import { ICrudService } from "./ICrudService";

export interface IOrderService extends ICrudService<Order, ResponseOrderDto, CreateOrderDto, CreateOrderDto>{
    findAllByUser(userId: number): Promise<ResponseOrderDto[]>;
}

export class OrderService implements IOrderService {
    
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly userRepository: IUserRepository,
        private readonly productRepository: IProductRepository,
        private readonly addressRepository: IAddressRepository,
        private readonly paymentMethodRepository: PaymentMethodRepository,
        private readonly couponRepository: ICouponRepository,
        private readonly orderStatusRepository: OrderStatusRepository,
    ) {}
    
    async findAll(relations?: string[]): Promise<ResponseOrderDto[]> {
        const allOrder = await this.orderRepository.findAll(['orderItems', 'orderItems.product']);
        const dto = allOrder.map(order => this.toResponseDto(order));
        console.log(dto);
        return dto;
    }

    update(id: number, data: Partial<CreateOrderDto>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findAllByUser(userId: number, relations?: string[]): Promise<ResponseOrderDto[]> {
        const allOrder = await this.orderRepository.findAllByUser(userId, ['orderItems', 'orderItems.product']);
        return allOrder.map(order => this.toResponseDto(order));
    }

    async create(data: CreateOrderDto): Promise<ResponseOrderDto> {

        if (!data.items || data.items.length === 0) {
            throw new BadRequestError("Order must have at least one item.");
        }

        // --- 1. Validação e busca de entidades relacionadas ---
        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new NotFoundError(`User with ID ${data.userId} not found.`);

        const address = await this.addressRepository.findById(data.addressId, ['user']);
        if (!address || address.user.id !== user.id) throw new BadRequestError("Invalid address for this user.");

        const paymentMethod = await this.paymentMethodRepository.findById(data.paymentMethodId);
        if (!paymentMethod) throw new NotFoundError("Payment method not found.");

        const initialStatus = await this.orderStatusRepository.findById(OrderStatusEnum.PENDING_PAYMENT);
        if (!initialStatus) throw new BadRequestError("Initial order status 'Pending Payment' not configured.");

        const orderItems: OrderItem[] = [];
        let initialTotalValue = MonetaryValue.fromFloat(0);

        // --- 2. Processamento dos Itens do Pedido ---
        for (const itemDto of data.items) {
            const product = await this.productRepository.findById(itemDto.productId);
            if (!product) throw new NotFoundError(`Product with ID ${itemDto.productId} not found.`);
            
            product.amount = product.amount.subtract(itemDto.quantity); // Valida e subtrai o estoque
            await this.productRepository.update(product.id, { amount: product.amount });

            const itemInitialValue = product.finalValue.multiply(itemDto.quantity);
            initialTotalValue = initialTotalValue.add(itemInitialValue);

            const orderItem = new OrderItem();
            orderItem.product = product;
            orderItem.quantity = itemDto.quantity;
            orderItem.initialValue = itemInitialValue;
            orderItem.finalValue = itemInitialValue; // Final value pode ser alterado por cupom depois
            orderItems.push(orderItem);
        }

        // --- 3. Aplicação de Cupom de Desconto ---
        let finalTotalValue = initialTotalValue;
        let coupon: Coupon | null = null;
        if (data.couponDescription) {
            coupon = await this.couponRepository.findByDescription(data.couponDescription);
            if (!coupon) throw new NotFoundError("Coupon not found.");
            if (!coupon.isValid) throw new BadRequestError("Coupon is not valid.");

            const discountMultiplier = 1 - (coupon.percentage / 100);
            finalTotalValue = initialTotalValue.multiply(discountMultiplier);
        }

        // --- 4. Criação da Entidade Order ---
        const order = new Order();
        order.user = user;
        order.address = address;
        order.paymentMethod = paymentMethod;
        order.status = initialStatus;
        order.coupon = coupon;
        order.initialTotalValue = initialTotalValue;
        order.finalTotalValue = finalTotalValue;
        order.creationTime = new Date();
        order.updateTime = new Date();
        order.orderItems = orderItems;
        
        // --- 5. Persistência (Idealmente em uma Transação) ---
        // Em um projeto real, toda a lógica deste método deveria estar
        // envolvida em um transactionManager para garantir a atomicidade.
        const savedOrder = await this.orderRepository.create(order);

        return this.toResponseDto(savedOrder);
    }

    async findById(id: number, relations?: string[]): Promise<ResponseOrderDto> {
        const order = await this.orderRepository.findById(id, ['orderItems', 'orderItems.product']);
        if (!order) throw new NotFoundError('Order not found');
        return this.toResponseDto(order);
    }

    async updateStatus(orderId: number, statusId: number): Promise<void> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new NotFoundError("Order not found.");

        const newStatus = await this.orderStatusRepository.findById(statusId);
        if (!newStatus) throw new NotFoundError("Order status not found.");

        order.status = newStatus;
        order.updateTime = new Date();
        await this.orderRepository.update(orderId, order);
    }

    private toResponseDto(order: Order): ResponseOrderDto {
        return {
            id: order.id,
            status: order.status.description,
            paymentMethod: order.paymentMethod.description,
            initialTotalValue: order.initialTotalValue.toFloat(),
            finalTotalValue: order.finalTotalValue.toFloat(),
            coupon: order.coupon ? {
                description: order.coupon.description,
                percentage: order.coupon.percentage
            } : undefined,
            items: order.orderItems.map(item => ({
                productName: item.product.name,
                quantity: item.quantity,
                finalValue: item.finalValue.toFloat()
            })),
            creationTime: order.creationTime
        };
    }
}