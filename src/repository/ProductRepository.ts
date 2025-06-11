import { AppDataSource } from "../db/data-source";
import { Product } from "../domain/entities/Product";
import { CrudRepository } from "./CrudRepository";

export class ProductRepository extends CrudRepository<Product> {

    constructor() {
        super(AppDataSource.getRepository(Product));
    }

    
}