import { getRepository, Repository } from 'typeorm'

import {
  ICreateCategoryDTO,
  ICategoriesRepository,
} from '@modules/cars/repositories/interfaces/ICategoriesRepository'

import { Category } from '../entities/Category'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ description, name })
    const categoryCreated = await this.repository.save(category)
    return categoryCreated
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository }
