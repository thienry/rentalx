import { instanceToInstance } from 'class-transformer'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO'

class UserMap {
  static toDTO(data: User): IUserResponseDTO {
    const user = instanceToInstance({
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      avatar_url: data.avatar_url,
      driver_license: data.driver_license,
    })

    return user
  }
}

export { UserMap }
