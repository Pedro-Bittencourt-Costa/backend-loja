import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { User } from "../domain/entities/User";
import { Cpf } from "../domain/value-objects/Cpf";
import { Email } from "../domain/value-objects/Email";
import { Telephone } from "../domain/value-objects/Telephone";
import { CrudRepository } from "./CrudRepository";
import { ICrudRepository } from "./ICrudRepository";

export interface IUserRepository extends ICrudRepository<User> {

    findByCpf(cpf: Cpf): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    findByTelephone(telephone: Telephone): Promise<User | null>;
}

export class UserRepository extends CrudRepository<User> implements IUserRepository {

    constructor() {
        super(AppDataSource.getRepository(User));
    }

    findByCpf(cpf: Cpf): Promise<User | null> {
        return this.repository.findOne({
            where: {cpf: cpf}
        });
    }

    findByEmail(email: Email, relations?: string[]): Promise<User | null> {
        const options: FindOneOptions<User> = {};
        options.relations = relations;
        return this.repository.findOne({
            where: {email: email},
            ...options
        });
    }

    findByTelephone(telephone: Telephone): Promise<User | null> {
        return this.repository.findOne({
            where: {telephone: telephone}
        });
    }

    
}