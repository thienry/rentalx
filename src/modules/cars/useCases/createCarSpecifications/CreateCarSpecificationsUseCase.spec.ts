import 'reflect-metadata'

import { AppError } from '@core/errors/AppError'
import { CAR_NOT_FOUND } from '@shared/utils/constants'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'
import { CreateCarSpecificationsUseCase } from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarSpecification: CreateCarSpecificationsUseCase
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecification = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('Should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Car 2',
      license_plate: 'ABC-9876',
      description: 'Description Car',
    })
    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    })
    const specificationsId = [specification.id]

    const specificationsCars = await createCarSpecification.execute({
      car_id: car.id,
      specifications_id: specificationsId,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })

  it('Should not be able to add a new specification to a non-existent car', async () => {
    const carId = '4cb4bdce-8824-4a4d-a901-c944842a3530'
    const specificationsId = [
      '9e39ef60-2685-4037-b9d7-906c0f57e97c',
      '3fe4122a-8019-4e24-ab29-7df9b9c1f76b',
    ]
    await expect(
      createCarSpecification.execute({ car_id: carId, specifications_id: specificationsId })
    ).rejects.toEqual(new AppError(CAR_NOT_FOUND))
  })
})
