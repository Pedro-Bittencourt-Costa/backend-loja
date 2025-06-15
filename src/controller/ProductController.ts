import { CreateProductDto } from "../domain/dto/CreateProductDto";
import { Product } from "../domain/entities/Product";
import { ProductService } from "../service/ProductService";
import { CrudController } from "./CrudController";

export class ProductController extends CrudController<Product, Product, CreateProductDto, CreateProductDto >{

    constructor(protected readonly service: ProductService){
        super(service);
    }

}