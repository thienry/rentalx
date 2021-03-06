import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CAR_EXISTS, CARS_REPOSITORY } from '@shared/utils/constants'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'

interface IRequest {
  name: string
  brand: string
  daily_rate: number
  fine_amount: number
  description: string
  category_id: string
  license_plate: string
}

@injectable()
class CreateCarUseCase {
  constructor(@inject(CARS_REPOSITORY) private carsRepository: ICarsRepository) {}

  async execute(data: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(data.license_plate)
    if (carAlreadyExists) throw new AppError(CAR_EXISTS)

    return this.carsRepository.create(data)
  }
}

export { CreateCarUseCase }
