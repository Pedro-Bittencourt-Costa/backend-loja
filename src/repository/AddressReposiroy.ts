import { AppDataSource } from "../db/data-source";
import { Address } from "../domain/entities/Address";
import { CrudRepository } from "./CrudRepository";

export class AddressRepository extends CrudRepository<Address> {

    constructor() {
        super(AppDataSource.getRepository(Address));
    }

    
}