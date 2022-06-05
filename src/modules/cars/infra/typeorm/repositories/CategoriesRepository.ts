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
    return this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return this.repository.find()
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name })
  }
}

export { CategoriesRepository }
