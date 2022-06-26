import 'reflect-metadata'

import dayjs from 'dayjs'

import { AppError } from '@core/errors/AppError'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase'
import { CAR_UNAVAILABLE, RENTAL_IN_PROGRESS, INVALID_RETURN_TIME } from '@shared/utils/constants'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'

let dayjsDateProvider: DayjsDateProvider
let createRentalUseCase: CreateRentalUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe('Create Rental', () => {
  const dayAdd24Hrs = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      carsRepositoryInMemory,
      rentalsRepositoryInMemory
    )
  })

  it('Should be able create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 40,
      category_id: '1234',
      license_plate: 'test',
      description: 'Car test',
    })
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
      expected_return_date: dayAdd24Hrs,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      expected_return_date: dayAdd24Hrs,
      car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8642',
      user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8643',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
        expected_return_date: dayAdd24Hrs,
      })
    ).rejects.toEqual(new AppError(RENTAL_IN_PROGRESS))
  })

  it('Should not be able create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      expected_return_date: dayAdd24Hrs,
      car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8642',
      user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8642',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3c',
        expected_return_date: dayAdd24Hrs,
      })
    ).rejects.toEqual(new AppError(CAR_UNAVAILABLE))
  })

  it('Should not be able create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8643',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError(INVALID_RETURN_TIME))
  })
})
