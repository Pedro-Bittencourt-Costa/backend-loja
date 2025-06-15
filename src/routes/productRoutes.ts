import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { authorizePermissions } from "../auth/authorizePermissions";
import { authenticateJWT } from "../middleware/middlewareValidarJWT";
import { PermissionsEnum as Permi } from "../domain/enums/PermissionsEnum";
import { CategoryRepository } from "../repository/CategoryRepository";
import { CreateProductDto } from "../domain/dto/CreateProductDto";
import { ProductController } from "../controller/ProductController";
import { ProductService } from "../service/ProductService";
import { ProductRepository } from "../repository/ProductRepository";


const productRouter = Router();
const productService = new ProductService(
    new ProductRepository(),
    new CategoryRepository()
);
const productController = new ProductController(productService);

// Rotas padrão do CRUD
productRouter.get('/', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(productController.findAll.bind(productController)));
productRouter.get('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(productController.findById.bind(productController)));
productRouter.post('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(CreateProductDto), asyncWrapper(productController.create.bind(productController)));
productRouter.put('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, validateDto(CreateProductDto), asyncWrapper(productController.update.bind(productController)));

export { productRouter };