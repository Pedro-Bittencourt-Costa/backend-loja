import { compare } from "bcrypt";
import { LoginDto } from "../domain/dto/LoginDto";
import { UserRepository } from "../repository/UserRepository";
import { BadRequestError } from "../domain/exception/BadRequestError";
import { createToken } from "../auth/auth";
import { ResponseUserDto } from "../domain/dto/ResponseUserDto";
import { Email } from "../domain/value-objects/Email";

export class LoginService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async signin(data: LoginDto): Promise<string> {

        const userExist = await this.userRepository.findByEmail(Email.create(data.email), ['permissions'])

        if(!userExist) throw new BadRequestError('Email invalido');

        const passwordConfirmed = await compare(data.password, userExist.hashedPassword.value);

        if(!passwordConfirmed) throw new BadRequestError('Senha invalido');
        
        const accessToken = createToken(
            {
                usuario: new ResponseUserDto(userExist)
            }
        )

        return accessToken;
    }
}