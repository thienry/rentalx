import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = []

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, { ...data, start_date: new Date() })
    this.rentals.push(rental)
    return rental
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.car_id === carId && !rental.end_date)
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.user_id === userId && !rental.end_date)
  }
}

export { RentalsRepositoryInMemory }
