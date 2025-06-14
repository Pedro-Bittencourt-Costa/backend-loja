import { Product } from "../entities/Product";

export class ResponseCategoryDto {
    public id!: number;
    public description!: string;
    public products?: Product[]; // Lista de produtos associados

    constructor(props: Partial<ResponseCategoryDto>) {
        Object.assign(this, props);
    }
}