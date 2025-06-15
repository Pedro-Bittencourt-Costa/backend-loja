import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { authorizePermissions } from "../auth/authorizePermissions";
import { authenticateJWT } from "../middleware/middlewareValidarJWT";
import { PermissionsEnum as Permi } from "../domain/enums/PermissionsEnum";
import { CategoryService } from "../service/CategoryService";
import { CategoryRepository } from "../repository/CategoryRepository";
import { CategoryController } from "../controller/CategoryController";
import { CreateCategoryDto } from "../domain/dto/CreateCategoryDto";


const categoryRouter = Router();
const categoryService = new CategoryService(
    new CategoryRepository()
);
const categoryController = new CategoryController(categoryService);

// Rotas padrão do CRUD
categoryRouter.get('/', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(categoryController.findAll.bind(categoryController)));
categoryRouter.get('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(categoryController.findById.bind(categoryController)));
categoryRouter.post('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(CreateCategoryDto), asyncWrapper(categoryController.create.bind(categoryController)));
categoryRouter.put('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(CreateCategoryDto), asyncWrapper(categoryController.update.bind(categoryController)));

export { categoryRouter };