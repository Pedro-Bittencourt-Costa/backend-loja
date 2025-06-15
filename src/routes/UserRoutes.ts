import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { UserService } from "../service/UserService";
import { UserController } from "../controller/UserController";
import { UserRepository } from "../repository/UserRepository";
import { PermissionRepository } from "../repository/PermissionRepository";
import { CreateUserDto } from "../domain/dto/CreateUserDto";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { authorizePermissions } from "../auth/authorizePermissions";
import { authenticateJWT } from "../middleware/middlewareValidarJWT";
import { PermissionsEnum as Permi } from "../domain/enums/PermissionsEnum";


const userRouter = Router();
const userService = new UserService(
    new UserRepository(),
    new PermissionRepository()
);
const userController = new UserController(userService);

// Rotas padrão do CRUD
userRouter.get('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, asyncWrapper(userController.findAll.bind(userController)));
userRouter.get('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(userController.findById.bind(userController)));
userRouter.post('/',  validateDto(CreateUserDto), asyncWrapper(userController.create.bind(userController)));
userRouter.put('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, validateDto(CreateUserDto), asyncWrapper(userController.update.bind(userController)));

export { userRouter };