import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'

interface IRequest {
  rental_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('DateProvider') private dateProvider: IDateProvider,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)
    if (!rental) throw new AppError('Rental does not exists!')

    const car = await this.carsRepository.findById(rental.car_id)
    if (!car) throw new AppError('Car does not exists!')

    const minimum_daily = 1
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)
    if (daily <= 0) daily = minimum_daily

    const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)
    let total = 0

    if (delay > 0) total = delay * car.fine_amount
    total += daily * car.daily_rate

    rental.end_date = dateNow
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}

export { DevolutionRentalUseCase }
