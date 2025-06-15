import {
  IsString,
  IsNotEmpty,
  Matches,
  ValidateNested,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

class NameDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  first!: string;

  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname is required' })
  surname!: string;
}

export class CreateUserDto {
  @IsString({ message: 'CPF must be a string' })
  @Matches(/^\d{11}$/, { message: 'CPF must contain exactly 11 digits' })
  cpf!: string;

  @ValidateNested()
  @Type(() => NameDto)
  name!: NameDto;

  @IsString({ message: 'Email must be a string' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Email must be a valid email address',
  })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 50, {
    message: 'Password must be between 6 and 50 characters long',
  })
  password!: string;

  @IsString({ message: 'Telephone must be a string' })
  @Matches(/^\d{10,11}$/, {
    message: 'Telephone must contain 10 or 11 digits',
  })
  telephone!: string;

  constructor(props?: CreateUserDto) {
    Object.assign(this, props);
  }
}
