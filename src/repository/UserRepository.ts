import { AppDataSource } from "../db/data-source";
import { User } from "../domain/entities/User";
import { CrudRepository } from "./CrudRepository";

export class UserRepository extends CrudRepository<User> {

    constructor() {
        super(AppDataSource.getRepository(User));
    }

    
}