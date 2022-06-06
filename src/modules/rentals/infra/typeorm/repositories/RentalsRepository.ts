import { getRepository, Repository } from 'typeorm'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.repository.findOne({ user_id: userId })
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.repository.findOne({ car_id: carId })
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id: data.car_id,
      user_id: data.user_id,
      expected_return_date: data.expected_return_date,
    })

    return this.repository.save(rental)
  }
}

export { RentalsRepository }
