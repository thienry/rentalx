import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

export interface ICreateCarDTO {
  id?: string
  name: string
  brand: string
  daily_rate: number
  description: string
  fine_amount: number
  category_id: string
  license_plate: string
  specifications?: Specification[]
}
