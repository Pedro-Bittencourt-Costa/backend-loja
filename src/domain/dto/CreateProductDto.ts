import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductDto {

  // @IsInt({ message: 'ID must be an integer' })
  // @Min(1, { message: 'ID must be greater than 0' })
  // public id!: number;

  @IsString({ message: 'Photo must be a string (URL or path)' })
  @IsNotEmpty({ message: 'Photo is required' })
  public photo!: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  public name!: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  public description!: string;

  @IsInt({ message: 'Amount must be an integer' })
  @Min(0, { message: 'Amount must be zero or greater' })
  public amount!: number;

  @IsNumber({}, { message: 'Final value must be a number' })
  @Min(0, { message: 'Final value must be zero or greater' })
  public finalValue!: number;

  @IsNumber({}, { message: 'Initial value must be a number' })
  @Min(0, { message: 'Initial value must be zero or greater' })
  public initialValue!: number;

  @IsInt({ message: 'Category ID must be an integer' })
  @Min(1, { message: 'Category ID must be greater than 0' })
  public idCategory!: number;
}
