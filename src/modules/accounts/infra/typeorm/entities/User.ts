import { v4 as uuidV4 } from 'uuid'
import { Expose } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  avatar: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driver_license: string

  @Column()
  is_admin: boolean

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
  }

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    console.log(process.env)
    const storageMode = {
      s3: `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`,
      local: `${process.env.APP_API_URL}/avatar/${this.avatar}`,
    }

    return storageMode[process.env.STORAGE_MODE] || null
  }
}

export { User }
