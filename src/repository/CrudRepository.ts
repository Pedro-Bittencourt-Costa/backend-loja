import { DeleteResult, FindManyOptions, FindOneOptions, ObjectLiteral, Repository, UpdateResult } from "typeorm";

export abstract class CrudRepository<T extends ObjectLiteral> {

    repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async findAll(relations?: string[]): Promise<T[]> {
        const options: FindManyOptions<T> = {}
        options.relations = relations;
        return this.repository.find(options);
    }

    async findById(id: number, relations?: string[]): Promise<T | null> {
        const options: FindOneOptions<T> = {}
        options.relations = relations;
        return this.repository.findOne({
            where: { id } as any,
            ...options
        });
    }

    async create(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    async update(id: number, entity: Partial<T>): Promise<UpdateResult> {
        return this.repository.update(id, entity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}