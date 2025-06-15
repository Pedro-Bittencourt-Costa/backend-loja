import { FindOneOptions, Repository } from "typeorm";
import { Permissions } from "../domain/entities/Permissions";
import { AppDataSource } from "../db/data-source";

export class PermissionRepository {

    protected readonly repository: Repository<Permissions>;
    
    constructor(){
        this.repository = AppDataSource.getRepository(Permissions)
    }

    findById(id: number, relations?: string[]): Promise<Permissions | null> {
            const options: FindOneOptions<Permissions> = {}
            options.relations = relations;
            return this.repository.findOne({
                where: { id } as any,
                ...options
            });
        }
}