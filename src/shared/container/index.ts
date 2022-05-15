import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/repositories/UsersRepository'
import { CategoriesRepository } from '@modules/cars/repositories/CategoriesRepository'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { SpecificationsRepository } from '@modules/cars/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
