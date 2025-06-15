import {
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './CreateOrderItemDto';

export class CreateOrderDto {

  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be greater than 0' })
  userId!: number;

  @IsInt({ message: 'Address ID must be an integer' })
  @Min(1, { message: 'Address ID must be greater than 0' })
  addressId!: number;

  @IsInt({ message: 'Payment Method ID must be an integer' })
  @Min(1, { message: 'Payment Method ID must be greater than 0' })
  paymentMethodId!: number;

  @IsArray({ message: 'Items must be an array' })
  @ValidateNested({ each: true, message: 'Each item must be valid' })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

  @IsOptional()
  @IsString({ message: 'Coupon description must be a string' })
  couponDescription?: string;

  @IsOptional()
  @IsString({ message: 'Observation must be a string' })
  observation?: string;
}
