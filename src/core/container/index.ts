import { container } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository)
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
