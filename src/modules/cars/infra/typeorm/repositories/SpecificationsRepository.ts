import { getRepository, Repository } from 'typeorm'

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

import { Specification } from '../entities/Specification'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name })
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description })
    return this.repository.save(specification)
  }

  async findByIds(specificationIds: string[]): Promise<Specification[]> {
    return this.repository.findByIds(specificationIds)
  }
}

export { SpecificationsRepository }
