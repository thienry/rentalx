import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateCarSpecificationsUseCase } from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsUseCase'

class CreateCarSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationsUseCase)
    const cars = await createCarSpecificationUseCase.execute({
      car_id: req.params.id,
      specifications_id: req.body.specifications_id,
    })

    return res.json(cars)
  }
}

export default new CreateCarSpecificationsController()
