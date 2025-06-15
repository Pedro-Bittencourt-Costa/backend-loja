import { CreateCouponDto } from "../domain/dto/CreateCouponDto";
import { UpdateCouponDto } from "../domain/dto/UpdateCouponDto";
import { Coupon } from "../domain/entities/Coupon";
import { CouponService } from "../service/CouponService";
import { CrudController } from "./CrudController";

export class CouponController extends CrudController<Coupon, Coupon, CreateCouponDto, UpdateCouponDto >{

    constructor(protected readonly service: CouponService){
        super(service);
    }

}