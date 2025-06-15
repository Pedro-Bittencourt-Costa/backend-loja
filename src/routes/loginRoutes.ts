import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { LoginService } from "../service/LoginService";
import { UserRepository } from "../repository/UserRepository";
import { LoginController } from "../controller/LoginController";
import { LoginDto } from "../domain/dto/LoginDto";


const loginRouter = Router();
const loginService = new LoginService(
    new UserRepository
);
const loginController = new LoginController(loginService);

// Rotas padrão do CRUD
loginRouter.post('/', validateDto(LoginDto), asyncWrapper(loginController.signin.bind(loginController)));

export { loginRouter };