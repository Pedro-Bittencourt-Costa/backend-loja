import { AppDataSource } from "../db/data-source";
import { Category } from "../domain/entities/Category";
import { CrudRepository } from "./CrudRepository";

export class CategoryRepository extends CrudRepository<Category> {
    
    constructor(){
        super(AppDataSource.getRepository(Category));
    }

}