import { inject, injectable } from 'tsyringe'

import { RENTALS_REPOSITORY } from '@shared/utils/constants'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'

@injectable()
class ListRentalsByUserUseCase {
  constructor(@inject(RENTALS_REPOSITORY) private rentalsRepository: IRentalsRepository) {}

  async execute(user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.findByUserId(user_id)
  }
}

export { ListRentalsByUserUseCase }
