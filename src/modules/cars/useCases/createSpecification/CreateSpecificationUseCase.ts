import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { SPECIFICATION_EXISTS, SPECIFICATIONS_REPOSITORY } from '@shared/utils/constants'
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject(SPECIFICATIONS_REPOSITORY) private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name)
    if (specificationAlreadyExists) throw new AppError(SPECIFICATION_EXISTS)

    const specification = await this.specificationsRepository.create({ name, description })
    return specification
  }
}

export { CreateSpecificationUseCase }
