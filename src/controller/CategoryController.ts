import { CreateCategoryDto } from "../domain/dto/CreateCategoryDto";
import { ResponseCategoryDto } from "../domain/dto/ResponseCategoryDto";
import { Category } from "../domain/entities/Category";
import { CategoryService } from "../service/CategoryService";
import { CrudController } from "./CrudController";

export class CategoryController extends CrudController<Category, ResponseCategoryDto, CreateCategoryDto, CreateCategoryDto >{

    constructor(protected readonly service: CategoryService){
        super(service);
    }

}