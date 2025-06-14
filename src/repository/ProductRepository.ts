import { AppDataSource } from "../db/data-source";
import { Product } from "../domain/entities/Product";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";


export interface IProductRepository extends ICrudRepository<Product> {
    
}

export class ProductRepository extends CrudRepository<Product> implements IProductRepository {

    constructor() {
        super(AppDataSource.getRepository(Product));
    }

    
}