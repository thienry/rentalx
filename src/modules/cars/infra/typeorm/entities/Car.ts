import { v4 as uuidV4 } from 'uuid'
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column()
  available: boolean

  @Column()
  daily_rate: number

  @Column()
  description: string

  @Column()
  fine_amount: number

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  category_id: string

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[]

  @Column()
  license_plate: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.available = true
    }
  }
}

export { Car }
