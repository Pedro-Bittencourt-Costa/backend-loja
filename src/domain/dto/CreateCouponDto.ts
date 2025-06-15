import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateCouponDto {

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  public description!: string;

  @IsNumber({}, { message: 'Percentage must be a number' })
  @Min(0, { message: 'Percentage must be at least 0' })
  @Max(100, { message: 'Percentage must be at most 100' })
  public percentage!: number;
}
