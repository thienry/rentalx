import { AppError } from '@core/errors/AppError'
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/createCarUseCase'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Name Car',
      license_plate: 'ABC-9876',
      description: 'Description Car',
    })

    expect(car).toHaveProperty('id')
  })

  it('Should not be able to create a car with existent license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        fine_amount: 60,
        name: 'Car 1',
        license_plate: 'ABC-9876',
        description: 'Description Car',
      })
      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        fine_amount: 60,
        name: 'Car 2',
        license_plate: 'ABC-9876',
        description: 'Description Car',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Car Available',
      license_plate: 'ABCD-9876',
      description: 'Description Car',
    })

    expect(car.available).toBe(true)
  })
})
