import 'reflect-metadata'
import dayjs from 'dayjs'

import { AppError } from '@core/errors/AppError'
import { DayjsDateProvider } from '@core/container/providers/dateProvider/DayjsDateProvider'
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'

let dayjsDateProvider: DayjsDateProvider
let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe('Create Rental', () => {
  const dayAdd24Hrs = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
  })

  it('Should be able create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8643',
      user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
      expected_return_date: dayAdd24Hrs,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8642',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
        expected_return_date: dayAdd24Hrs,
      })
      await createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8643',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
        expected_return_date: dayAdd24Hrs,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able create a new rental if there is another open to the same car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8642',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
        expected_return_date: dayAdd24Hrs,
      })
      await createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8642',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3c',
        expected_return_date: dayAdd24Hrs,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able create a new rental with invalid return time', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '895db1f0-988d-40b6-a1dd-8a622ffe8643',
        user_id: 'c2dbe8f2-fbed-4b0c-9882-04d180b58a3d',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
