import { CreateCategoryDto } from "../domain/dto/CreateCategoryDto";
import { ResponseCategoryDto } from "../domain/dto/ResponseCategoryDto";
import { Category } from "../domain/entities/Category";
import { BadRequestError } from "../domain/exception/BadRequestError";
import { NotFoundError } from "../domain/exception/NotFoundError";
import { ICategoryRepository } from "../repository/CategoryRepository";
import { ICrudService } from "./ICrudService";

export interface ICategoryService extends ICrudService<Category, Category, CreateCategoryDto, Partial<CreateCategoryDto>> {}

export class CategoryService implements ICategoryService {

    private readonly categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async create(data: CreateCategoryDto): Promise<Category> {
        // Regra de Negócio: Verifica se já existe uma categoria com a mesma descrição
        const existingCategory = await this.categoryRepository.findByDescription(data.description);
        if (existingCategory) {
            throw new BadRequestError(`Category with description "${data.description}" already exists.`);
        }

        const category = new Category();
        category.description = data.description;

        return this.categoryRepository.create(category);
    }

    async findAll(relations?: string[]): Promise<Category[]> {
        
        return this.categoryRepository.findAll(relations);
    }

    async findById(id: number, relations?: string[]): Promise<Category> {
        const category = await this.categoryRepository.findById(id, relations);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;
    }

    async update(id: number, data: Partial<CreateCategoryDto>): Promise<void> {
        const categoryToUpdate = await this.categoryRepository.findById(id);
        if (!categoryToUpdate) {
            throw new NotFoundError('Category not found to update.');
        }

        // Se a descrição estiver sendo alterada, verifica se a nova descrição já está em uso
        if (data.description && data.description !== categoryToUpdate.description) {
            const existingCategory = await this.categoryRepository.findByDescription(data.description);
            if (existingCategory && existingCategory.id !== id) {
                throw new BadRequestError(`Another category with description "${data.description}" already exists.`);
            }
            categoryToUpdate.description = data.description;
        }

        const result = await this.categoryRepository.update(id, categoryToUpdate);
        if (result.affected === 0) {
            throw new BadRequestError('Error when updating category.');
        }
    }

    // async delete(id: number): Promise<void> {
    //     // Regra de Negócio: Verifica se a categoria não tem produtos associados
    //     const category = await this.categoryRepository.findById(id, ['products']);

    //     if (!category) {
    //         throw new Error('Category not found for deletion.');
    //     }

    //     if (category.products && category.products.length > 0) {
    //         throw new Error('Cannot delete a category that has associated products.');
    //     }

    //     const result = await this.categoryRepository.delete(id);
    //     if (result.affected === 0) {
    //         throw new Error('Error when deleting category.');
    //     }
    // }
}