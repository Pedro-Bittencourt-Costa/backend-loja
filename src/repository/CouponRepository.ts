import { AppDataSource } from "../db/data-source";
import { Coupon } from "../domain/entities/Coupon";
import { CrudRepository } from "./CrudRepository";

export class CouponRepository extends CrudRepository<Coupon> {

    constructor() {
        super(AppDataSource.getRepository(Coupon));
    }

    
}