import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { DevolutionRentalUseCase } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalUseCase'

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)
    const rental = await devolutionRentalUseCase.execute({ rental_id: req.params.rental_id })

    return res.status(200).json(rental)
  }
}

export default Object.freeze(new DevolutionRentalController())
