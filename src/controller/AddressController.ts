import { CreateAddressDto } from "../domain/dto/CreateAddressDto";
import { ResponseAddressDto } from "../domain/dto/ResponseAddressDto";
import { Address } from "../domain/entities/Address";
import { AddressService } from "../service/AddressService";
import { CrudController } from "./CrudController";

export class AddressController extends CrudController<Address, ResponseAddressDto, CreateAddressDto, CreateAddressDto >{

    constructor(protected readonly service: AddressService){
        super(service);
    }

}