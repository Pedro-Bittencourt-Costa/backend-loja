import { DeleteResult, UpdateResult } from "typeorm";

export interface ICrudRepository<T> {

    findAll(relations?: string[]): Promise<T[]>;
    findById(id: number, relations?: string[]): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(id: number, entity: Partial<T>): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}