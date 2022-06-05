import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationsUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository') private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(data.car_id)
    if (!carExists) throw new AppError('Car does not exists!')

    carExists.specifications = await this.specificationsRepository.findByIds(data.specifications_id)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.carsRepository.create(carExists)
  }
}

export { CreateCarSpecificationsUseCase }
