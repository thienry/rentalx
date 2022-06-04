import { getRepository, Repository } from 'typeorm'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand })
    }
    if (name) {
      carsQuery.andWhere('c.name = :name', { name })
    }
    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ license_plate: licensePlate })
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const car = this.repository.create({
      name: data.name,
      brand: data.brand,
      daily_rate: data.daily_rate,
      category_id: data.category_id,
      description: data.description,
      fine_amount: data.fine_amount,
      license_plate: data.license_plate,
    })
    await this.repository.save(car)
    return car
  }
}

export { CarsRepository }
