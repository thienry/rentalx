import { getRepository, Repository } from 'typeorm'

import { Specification } from '../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './interfaces/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name })
    return specification
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description })
    const specificationCreated = await this.repository.save(specification)
    return specificationCreated
  }
}

export { SpecificationsRepository }
