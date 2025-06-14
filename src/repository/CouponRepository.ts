import { FindManyOptions, FindOneOptions } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { Coupon } from "../domain/entities/Coupon";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";

export interface ICouponRepository extends ICrudRepository<Coupon> {
    findByDescription(description: string, relations?: string[]): Promise<Coupon | null>;
    
}
export class CouponRepository extends CrudRepository<Coupon> implements ICouponRepository {

    constructor() {
        super(AppDataSource.getRepository(Coupon));
    }

    findByDescription(description: string, relations?: string[]): Promise<Coupon | null> {
        const options: FindOneOptions<Coupon> = {};
        options.relations = relations;
        return this.repository.findOne({
            where: {
                description: description
            }, 
            ...options
            
        });
    }

        
}