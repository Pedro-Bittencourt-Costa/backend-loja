import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  public description!: string;
}
