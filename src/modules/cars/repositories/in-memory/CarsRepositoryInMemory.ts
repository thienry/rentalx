import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, data)
    this.cars.push(car)
    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate)
  }

  async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available || car.brand === brand || car.name === name || car.category_id === category_id
    )
  }
}

export { CarsRepositoryInMemory }
