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
    return this.repository.findOne({ where: { user_id: userId, end_date: null } })
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id: carId, end_date: null } })
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id: data.id,
      total: data.total,
      car_id: data.car_id,
      user_id: data.user_id,
      end_date: data.end_date,
      expected_return_date: data.expected_return_date,
    })

    return this.repository.save(rental)
  }

  async findById(rentalId: string): Promise<Rental> {
    return this.repository.findOne(rentalId)
  }
}

export { RentalsRepository }
