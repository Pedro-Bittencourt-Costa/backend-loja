import { AppDataSource } from "../db/data-source";
import { Address } from "../domain/entities/Address";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";

export interface IAddressRepository extends ICrudRepository<Address>{

}

export class AddressRepository extends CrudRepository<Address> implements IAddressRepository {

    constructor() {
        super(AppDataSource.getRepository(Address));
    }

    
}