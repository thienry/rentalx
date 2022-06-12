import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findById(userId: string): Promise<Car>
  findByLicensePlate(licensePlate: string): Promise<Car>
  updateAvailable(carId: string, available: boolean): Promise<void>
  findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]>
}

export { ICarsRepository }
