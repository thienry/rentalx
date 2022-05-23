import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'

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
  daily_rate: string

  @Column()
  description: string

  @Column()
  fine_amount: number

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  category_id: string

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
