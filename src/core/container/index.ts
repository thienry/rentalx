import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
