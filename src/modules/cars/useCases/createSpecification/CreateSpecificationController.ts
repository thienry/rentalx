import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from '@modules/cars/useCases/createSpecification/CreateSpecificationUseCase'

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    const specification = await createSpecificationUseCase.execute({ name, description })

    return res.status(201).send({ specification })
  }
}

export default new CreateSpecificationController()
