import { Router } from "express";
import { validateDto } from "../middleware/validateDtos";
import { UserRepository } from "../repository/UserRepository";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { authorizePermissions } from "../auth/authorizePermissions";
import { authenticateJWT } from "../middleware/middlewareValidarJWT";
import { PermissionsEnum as Permi } from "../domain/enums/PermissionsEnum";
import { AddressService } from "../service/AddressService";
import { AddressRepository } from "../repository/AddressReposiroy";
import { AddressController } from "../controller/AddressController";
import { CreateAddressDto } from "../domain/dto/CreateAddressDto";


const addressRouter = Router();
const addressService = new AddressService(
    new AddressRepository(),
    new UserRepository()
);
const addressController = new AddressController(addressService);

// Rotas padrão do CRUD
addressRouter.get('/', authenticateJWT, authorizePermissions(Permi.ADMIN) as any, asyncWrapper(addressController.findAll.bind(addressController)));
addressRouter.get('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, asyncWrapper(addressController.findById.bind(addressController)));
addressRouter.post('/', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, validateDto(CreateAddressDto), asyncWrapper(addressController.create.bind(addressController)));
addressRouter.put('/:id', authenticateJWT, authorizePermissions(Permi.ADMIN, Permi.CUSTOMER) as any, validateDto(CreateAddressDto), asyncWrapper(addressController.update.bind(addressController)));

export { addressRouter };