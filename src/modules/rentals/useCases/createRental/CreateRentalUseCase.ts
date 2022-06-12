import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'
import { IDateProvider } from '@core/container/providers/dateProvider/interfaces/IDateProvider'
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository'

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository
  ) {}

  async execute(data: IRequest): Promise<Rental> {
    const minimumHours = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(data.car_id)
    if (carUnavailable) throw new AppError('Car unavailable!')

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(data.user_id)
    if (rentalOpenToUser) throw new AppError("There's a rental in progress for a user!")

    const dateNow = this.dateProvider.dateNow()
    const comparedDate = this.dateProvider.compareInHours(dateNow, data.expected_return_date)
    if (comparedDate < minimumHours) throw new AppError('Invalid return time!')

    const rental = await this.rentalsRepository.create({
      car_id: data.car_id,
      user_id: data.user_id,
      expected_return_date: data.expected_return_date,
    })

    await this.carsRepository.updateAvailable(data.car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
