import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { CATEGORY_EXISTS, CATEGORIES_REPOSITORY } from '@shared/utils/constants'
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(@inject(CATEGORIES_REPOSITORY) private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)
    if (categoryAlreadyExists) throw new AppError(CATEGORY_EXISTS)

    const category = await this.categoriesRepository.create({ name, description })
    return category
  }
}

export { CreateCategoryUseCase }
