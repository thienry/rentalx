import { inject, injectable } from 'tsyringe'

import { CARS_REPOSITORY } from '@shared/utils/constants'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'

interface IRequest {
  name?: string
  brand?: string
  category_id?: string
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(@inject(CARS_REPOSITORY) private carsRepository: ICarsRepository) {}

  async execute(data?: IRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable(data.brand, data.name, data.category_id)
  }
}

export { ListAvailableCarsUseCase }
