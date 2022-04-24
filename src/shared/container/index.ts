import { container } from 'tsyringe'

import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/interfaces/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/interfaces/ISpecificationsRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository'

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
