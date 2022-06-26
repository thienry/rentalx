import { container } from 'tsyringe'

import '@shared/providers'

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
import {
  CARS_REPOSITORY,
  USERS_REPOSITORY,
  RENTALS_REPOSITORY,
  CATEGORIES_REPOSITORY,
  CARS_IMAGES_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
  SPECIFICATIONS_REPOSITORY,
} from '@shared/utils/constants'

container.registerSingleton<ICarsRepository>(CARS_REPOSITORY, CarsRepository)
container.registerSingleton<IUsersRepository>(USERS_REPOSITORY, UsersRepository)
container.registerSingleton<IRentalsRepository>(RENTALS_REPOSITORY, RentalsRepository)
container.registerSingleton<ICategoriesRepository>(CATEGORIES_REPOSITORY, CategoriesRepository)
container.registerSingleton<ICarsImagesRepository>(CARS_IMAGES_REPOSITORY, CarsImagesRepository)
container.registerSingleton<IUsersTokensRepository>(USERS_TOKENS_REPOSITORY, UsersTokensRepository)
container.registerSingleton<ISpecificationsRepository>(
  SPECIFICATIONS_REPOSITORY,
  SpecificationsRepository
)
