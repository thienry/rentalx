import { getRepository, Repository } from 'typeorm'

import { Category } from '../entities/Category'
import { ICreateCategoryDTO, ICategoriesRepository } from './interfaces/ICategoriesRepository'

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
