import 'reflect-metadata'

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase'

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Car',
      license_plate: 'ABC-9876',
      description: 'Description Car',
    })
    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand_test',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Car 2',
      license_plate: 'ABC-9876',
      description: 'Description Car',
    })
    const cars = await listCarsUseCase.execute({ brand: 'Brand_test' })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand_test',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Car 2',
      license_plate: 'ABC-9876',
      description: 'Description Car',
    })
    const cars = await listCarsUseCase.execute({ name: 'Car 2' })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand_test',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      name: 'Car 2',
      license_plate: 'ABC-9876',
      description: 'Description Car',
    })
    const cars = await listCarsUseCase.execute({ category_id: 'category' })

    expect(cars).toEqual([car])
  })
})
