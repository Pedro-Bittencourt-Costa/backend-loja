import { IsString, Length, Matches } from "class-validator";

export class LoginDto {

    @IsString({ message: 'Email must be a string' })
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: 'Email must be a valid email address',
    })
    public email!: string;

    @IsString({ message: 'Password must be a string' })
    @Length(6, 50, {
        message: 'Password must be between 6 and 50 characters long',
    })
    public password!: string;

}