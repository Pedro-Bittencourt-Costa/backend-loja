import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { authorizePermissions } from "../auth/authorizePermissions";
import { authenticateJWT } from "../middleware/middlewareValidarJWT";
import { PermissionsEnum as Permi } from "../domain/enums/PermissionsEnum";
import { OrderService } from "../service/OrderService";
import { OrderController } from "../controller/OrderController";
import { CreateOrderDto } from "../domain/dto/CreateOrderDto";
import { UserRepository } from "../repository/UserRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { AddressRepository } from "../repository/AddressReposiroy";
import { PaymentMethodRepository } from "../repository/PaymentMethodRepository";
import { CouponRepository } from "../repository/CouponRepository";
import { OrderStatusRepository } from "../repository/OrderStatusRepository";
import { OrderRepository } from "../repository/OrderRepository";


const orderRouter = Router();
const orderService = new OrderService(
    new OrderRepository(),
    new UserRepository(),
    new ProductRepository(),
    new AddressRepository(),
    new PaymentMethodRepository,
    new CouponRepository(),
    new OrderStatusRepository()
);
const orderController = new OrderController(orderService);

orderRouter.get('/user/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(orderController.findAllByUser.bind(orderController)));

// Rotas padrão do CRUD
orderRouter.get('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, asyncWrapper(orderController.findAll.bind(orderController)));
orderRouter.get('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(orderController.findById.bind(orderController)));
orderRouter.post('/', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, validateDto(CreateOrderDto), asyncWrapper(orderController.create.bind(orderController)));
orderRouter.put('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(CreateOrderDto), asyncWrapper(orderController.update.bind(orderController)));

export { orderRouter };