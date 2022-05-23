import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateCarUseCase } from '@modules/cars/useCases/createCar/createCarUseCase'

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body
    const createCarUseCase = container.resolve(CreateCarUseCase)

    const createdCar = await createCarUseCase.execute({
      name: data.name,
      brand: data.brand,
      daily_rate: data.daily_rate,
      category_id: data.category_id,
      description: data.description,
      fine_amount: data.fine_amount,
      license_plate: data.license_plate,
    })

    return res.status(201).json({ car: createdCar })
  }
}

export { CreateCarController }
