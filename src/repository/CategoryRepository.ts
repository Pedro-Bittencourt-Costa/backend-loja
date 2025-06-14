import { FindOneOptions, FindOptionsUtils } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { Category } from "../domain/entities/Category";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";

export interface ICategoryRepository extends ICrudRepository<Category>{
    findByDescription(description: string): Promise<Category | null>;
}

export class CategoryRepository extends CrudRepository<Category> implements ICategoryRepository {
    
    constructor(){
        super(AppDataSource.getRepository(Category));
    }

    findByDescription(description: string, relations?: string[]): Promise<Category | null> {
        const options: FindOneOptions<Category> = {};
        options.relations = relations;
        return this.repository.findOne({
            where: {
                description: description
            }, 
            ...options
            
        });
    }

}