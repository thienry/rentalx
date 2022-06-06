import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'

interface IRentalsRepository {
  create(rental: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId: string): Promise<Rental>
}

export { IRentalsRepository }
