import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { authorizePermissions } from "../auth/authorizePermissions";
import { authenticateJWT } from "../middleware/middlewareValidarJWT";
import { PermissionsEnum as Permi } from "../domain/enums/PermissionsEnum";
import { CouponService } from "../service/CouponService";
import { CouponRepository } from "../repository/CouponRepository";
import { CouponController } from "../controller/CouponController";
import { CreateCouponDto } from "../domain/dto/CreateCouponDto";
import { UpdateCouponDto } from "../domain/dto/UpdateCouponDto";


const couponRouter = Router();
const couponService = new CouponService(
    new CouponRepository()
);
const couponController = new CouponController(couponService);

// Rotas padrão do CRUD
couponRouter.get('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, asyncWrapper(couponController.findAll.bind(couponController)));
couponRouter.get('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(couponController.findById.bind(couponController)));
couponRouter.post('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(CreateCouponDto), asyncWrapper(couponController.create.bind(couponController)));
couponRouter.put('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(UpdateCouponDto), asyncWrapper(couponController.update.bind(couponController)));

export { couponRouter };