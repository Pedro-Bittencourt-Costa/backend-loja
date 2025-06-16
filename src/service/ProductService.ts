import { CreateProductDto } from "../domain/dto/CreateProductDto";
import { Product } from "../domain/entities/Product";
import { BadRequestError } from "../domain/exception/BadRequestError";
import { NotFoundError } from "../domain/exception/NotFoundError";
import { Amount } from "../domain/value-objects/Amount";
import { MonetaryValue } from "../domain/value-objects/MonetaryValue";
import { CategoryRepository } from "../repository/CategoryRepository";
import { IProductRepository } from "../repository/ProductRepository";
import { ICrudService } from "./ICrudService";

export interface IProductService extends ICrudService<Product, Product, CreateProductDto, CreateProductDto>{

}

export class ProductService implements IProductService {

    private readonly productRepository: IProductRepository;
    private readonly categoryRepository: CategoryRepository;

    constructor(productRepository: IProductRepository, categoryRepository: CategoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    
    findAll(relations?: string[]): Promise<Product[]> {
        return this.productRepository.findAll(relations);
    }

    async findById(id: number, relations?: string[]): Promise<Product> {
        const productExist = await this.productRepository.findById(id, relations);
        if(!productExist) throw new NotFoundError('Product not found');
        return productExist;
    }

    async create(data: CreateProductDto): Promise<Product> {
        
        const categoryExist = await this.categoryRepository.findById(data.idCategory);
        if(!categoryExist) throw new NotFoundError('Category not found');

        const product = new Product({
            amount: new Amount(data.amount),
            description: data.description,
            name: data.name,
            photo: data.photo,
            finalValue: MonetaryValue.fromFloat(data.finalValue),
            initialValue: MonetaryValue.fromFloat(data.initialValue),
        });
        product.category = categoryExist;

        return await this.productRepository.create(product);

    }

    async update(id: number, data: Partial<CreateProductDto>): Promise<void> {
        
        const productExist = await this.productRepository.findById(id, ['category']);
        if(!productExist) throw new NotFoundError('Product not found');

        if (data.name) productExist.name = data.name;
        if (data.description) productExist.description = data.description;
        if (data.photo) productExist.photo = data.photo;

        if (data.initialValue !== undefined) {
            productExist.initialValue = MonetaryValue.fromFloat(data.initialValue);
        }
        if (data.finalValue !== undefined) {
            productExist.finalValue = MonetaryValue.fromFloat(data.finalValue);
        }
        if (data.amount !== undefined) {
            productExist.amount = new Amount(data.amount); 
        }

        if (data.idCategory && data.idCategory !== productExist.category?.id) {
            const newCategory = await this.categoryRepository.findById(data.idCategory);
            if (!newCategory) {
                throw new NotFoundError(`Category with ID ${data.idCategory} not found.`);
            }
            productExist.category = newCategory; 
        }

        if((await this.productRepository.update(id, productExist)).affected === 0){
            throw new BadRequestError('error when updating product')
        }
    }

}