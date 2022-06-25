import { container } from 'tsyringe'

import '@core/container/providers'

import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)
container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository)
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository)
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
