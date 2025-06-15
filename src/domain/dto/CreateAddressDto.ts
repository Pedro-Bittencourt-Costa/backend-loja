import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';

export class CreateAddressDto {

  @IsOptional()
  @IsInt({ message: 'ID must be an integer number' })
  public id?: number;

  @IsString({ message: 'CEP must be a string' })
  @IsNotEmpty({ message: 'CEP is required' })
  public cep!: string;

  @IsString({ message: 'Street must be a string' })
  @IsNotEmpty({ message: 'Street is required' })
  public street!: string;

  @IsString({ message: 'District must be a string' })
  @IsNotEmpty({ message: 'District is required' })
  public district!: string;

  @IsNumber({}, { message: 'Number must be a number' })
  @Min(1, { message: 'Number must be greater than 0' })
  public number!: number;

  @IsOptional()
  @IsString({ message: 'Reference must be a string' })
  public reference?: string;

  @IsOptional()
  @IsString({ message: 'Complement must be a string' })
  public complement?: string;

  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be greater than 0' })
  public idUser!: number;

  constructor(props?: CreateAddressDto) {
    Object.assign(this, props);
  }
}
