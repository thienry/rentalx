import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'
import { CAR_NOT_FOUND, CARS_REPOSITORY, SPECIFICATIONS_REPOSITORY } from '@shared/utils/constants'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationsUseCase {
  constructor(
    @inject(CARS_REPOSITORY) private carsRepository: ICarsRepository,
    @inject(SPECIFICATIONS_REPOSITORY) private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(data.car_id)
    if (!car) throw new AppError(CAR_NOT_FOUND)

    car.specifications = await this.specificationsRepository.findByIds(data.specifications_id)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.carsRepository.create(car)
  }
}

export { CreateCarSpecificationsUseCase }
