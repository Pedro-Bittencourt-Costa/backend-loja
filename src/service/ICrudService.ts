export interface ICrudService<T, responseDto = T, createDto = T, updateDto = T> {

    findAll(relations?: string[]): Promise<responseDto[]>;
    findById(id: number, relations?: string[]): Promise<responseDto>;
    create(data: createDto): Promise<responseDto>;
    update(id: number, data: Partial<updateDto>): Promise<void>;
}