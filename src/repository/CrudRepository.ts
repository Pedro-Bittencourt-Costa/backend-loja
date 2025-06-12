import { DeleteResult, FindManyOptions, FindOneOptions, ObjectLiteral, Repository, UpdateResult } from "typeorm";
import { ICrudRepository } from "./ICrudRepository";

export abstract class CrudRepository<T extends ObjectLiteral> implements ICrudRepository<T> {

    repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    findAll(relations?: string[]): Promise<T[]> {
        const options: FindManyOptions<T> = {}
        options.relations = relations;
        return this.repository.find(options);
    }

    findById(id: number, relations?: string[]): Promise<T | null> {
        const options: FindOneOptions<T> = {}
        options.relations = relations;
        return this.repository.findOne({
            where: { id } as any,
            ...options
        });
    }

    create(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    update(id: number, entity: Partial<T>): Promise<UpdateResult> {
        return this.repository.update(id, entity);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
    
}