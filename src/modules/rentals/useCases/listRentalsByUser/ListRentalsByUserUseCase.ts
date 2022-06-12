import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'

@injectable()
class ListRentalsByUserUseCase {
  constructor(@inject('RentalsRepository') private rentalsRepository: IRentalsRepository) {}

  async execute(user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.findByUserId(user_id)
  }
}

export { ListRentalsByUserUseCase }
