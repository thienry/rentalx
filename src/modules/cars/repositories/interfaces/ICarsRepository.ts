import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'

interface ICarsRepository {
  findByLicensePlate(licensePlate: string): Promise<Car>
  create(data: ICreateCarDTO): Promise<Car>
}

export { ICarsRepository }
