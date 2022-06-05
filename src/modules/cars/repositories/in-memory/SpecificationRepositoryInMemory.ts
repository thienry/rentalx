import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/interfaces/ISpecificationsRepository'

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = []

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name)
  }

  async findByIds(specificationIds: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      specificationIds.includes(specification.id)
    )
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, { name, description })
    this.specifications.push(specification)
    return specification
  }
}

export { SpecificationRepositoryInMemory }
