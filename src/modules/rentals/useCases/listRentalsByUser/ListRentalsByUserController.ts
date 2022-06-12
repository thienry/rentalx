import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ListRentalsByUserUseCase } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserUseCase'

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)
    const rentals = await listRentalsByUserUseCase.execute(req.user.id)

    return res.status(200).json(rentals)
  }
}

export default Object.freeze(new ListRentalsByUserController())
