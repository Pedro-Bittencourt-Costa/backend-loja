import { CreateCouponDto } from "../domain/dto/CreateCouponDto";
import { UpdateCouponDto } from "../domain/dto/UpdateCouponDto";
import { Coupon } from "../domain/entities/Coupon";
import { BadRequestError } from "../domain/exception/BadRequestError";
import { NotFoundError } from "../domain/exception/NotFoundError";
import { ICouponRepository } from "../repository/CouponRepository";
import { ICrudService } from "./ICrudService";

export interface ICouponService extends ICrudService<Coupon, Coupon, CreateCouponDto, UpdateCouponDto> {
    invalidate(id: number): Promise<void>;
}

export class CouponService implements ICouponService {

    private readonly couponRepository: ICouponRepository;

    constructor(couponRepository: ICouponRepository) {
        this.couponRepository = couponRepository;
    }

    async create(data: CreateCouponDto): Promise<Coupon> {
     
        const existingCoupon = await this.couponRepository.findByDescription(data.description);
        if (existingCoupon) {
            throw new BadRequestError(`Coupon with description "${data.description}" already exists.`);
        }
        
        if(data.percentage <= 0 || data.percentage > 100){
            throw new BadRequestError('Percentage must be between 1 and 100.');
        }

        const coupon = new Coupon();
        coupon.description = data.description;
        coupon.percentage = data.percentage;
        coupon.isValid = true;

        return this.couponRepository.create(coupon);
    }

    findAll( relations?: string[]): Promise<Coupon[]> {
        return this.couponRepository.findAll(relations);
    }

    async findById(id: number, relations?: string[]): Promise<Coupon> {
        const coupon = await this.couponRepository.findById(id, relations);
        if (!coupon) {
            throw new NotFoundError('Coupon not found');
        }
        return coupon;
    }

    async update(id: number, data: UpdateCouponDto): Promise<void> {
        const couponToUpdate = await this.couponRepository.findById(id);
        if (!couponToUpdate) {
            throw new NotFoundError('Coupon not found to update.');
        }

        // Regra de Negócio: Se a descrição for alterada, verifica se a nova já existe
        if (data.description && data.description !== couponToUpdate.description) {
            const existingCoupon = await this.couponRepository.findByDescription(data.description);
            if (existingCoupon && existingCoupon.id !== id) {
                throw new BadRequestError(`Another coupon with description "${data.description}" already exists.`);
            }
            couponToUpdate.description = data.description;
        }
        
        if (data.percentage !== undefined) couponToUpdate.percentage = data.percentage;

        const result = await this.couponRepository.update(id, couponToUpdate);
        if (result.affected === 0) {
            throw new BadRequestError('Error when updating coupon.');
        }
    }


    async invalidate(id: number): Promise<void> {
        const coupon = await this.couponRepository.findById(id);
        if (!coupon) {
            throw new NotFoundError('Coupon not found to invalidate.');
        }
        await this.update(id, { isValid: false });
    }

    // async delete(id: number): Promise<void> {
    //     // Regra de Negócio: Impede a exclusão de cupons já utilizados.
    //     const coupon = await this.couponRepository.findById(id, ['orders']);
    //     if (!coupon) {
    //         throw new Error('Coupon not found for deletion.');
    //     }

    //     if (coupon.orders && coupon.orders.length > 0) {
    //         throw new Error('Cannot delete a coupon that has been used. Consider invalidating it instead.');
    //     }

    //     const result = await this.couponRepository.delete(id);
    //     if (result.affected === 0) {
    //         throw new Error('Error when deleting coupon.');
    //     }
    // }
}