import { Request, Response } from "express";
import { ICrudService } from "../service/ICrudService";


export class CrudController<T, responseDto = T, createDto = T, updateDto = T> {
    constructor(protected service: ICrudService<T, responseDto, createDto, updateDto >
    ) {}

    async findAll(req: Request, res: Response): Promise<Response> {

        const queryKeys = Object.keys(req.query);

        const invalidParams = queryKeys.filter(key => key !== 'relations');

        if (invalidParams.length > 0) {
            return res.status(400).json({
                message: `invalid parameters: ${invalidParams.join(', ')}`
            });
        }

        const relationsArray = this.findRelations(req);
        const items = await this.service.findAll(relationsArray);
        return res.status(200).json(items);
    }

    async findById(req: Request, res: Response): Promise<void> {
        
        const id = Number(req.params.id);
        const relationsArray = this.findRelations(req);
        const item = await this.service.findById(id, relationsArray);
        if (!item) {
            res.status(404).json({ message: 'not found' });
            return;
        }
        res.status(200).json(item);
    }

    async create(req: Request, res: Response): Promise<void> {
   
        const item = await this.service.create(req.body);
        res.status(201).json(item);
    }

    async update(req: Request, res: Response): Promise<void> {

        const id = Number(req.params.id);
        const item = await this.service.update(id, req.body);
        res.status(204).json(item);
    }

    findRelations(req: Request): string[] {

        const { relations } = req.query;

        let relationsArray: string[] = [];

        if (relations) {
            if (typeof relations === 'string') {
            relationsArray = relations.split(',').map(r => r.trim());
            }
        }

        return relationsArray;
    }
}