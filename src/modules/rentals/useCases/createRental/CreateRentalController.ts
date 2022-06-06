import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase'

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createRentalsUseCase = container.resolve(CreateRentalUseCase)
    const rental = await createRentalsUseCase.execute({
      user_id: req.user.id,
      car_id: req.body.car_id,
      expected_return_date: req.body.expected_return_date,
    })

    return res.status(201).json({ rental })
  }
}

export default Object.freeze(new CreateRentalController())
