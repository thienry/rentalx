import { inject, injectable } from 'tsyringe'

import { CATEGORIES_REPOSITORY } from '@shared/utils/constants'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  constructor(@inject(CATEGORIES_REPOSITORY) private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}

export { ListCategoriesUseCase }
