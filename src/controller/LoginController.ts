import { Request, Response } from "express";
import { LoginService } from "../service/LoginService";
import { LoginDto } from "../domain/dto/LoginDto";
import { plainToInstance } from "class-transformer";

export class LoginController {

    loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    async signin(req: Request, res: Response): Promise<Response> {
        
        const data = plainToInstance(LoginDto, req.body);
        const token = await this.loginService.signin(data);
        return res.status(200).json({ accessToken: token});
    }
}