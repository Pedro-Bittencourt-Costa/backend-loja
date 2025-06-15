import { IsOptional, IsString, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class UpdateCouponDto {

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Percentage must be a number' })
  @Min(0, { message: 'Percentage must be at least 0' })
  @Max(100, { message: 'Percentage must be at most 100' })
  percentage?: number;

  @IsOptional()
  @IsBoolean({ message: 'isValid must be a boolean value' })
  isValid?: boolean;
}
