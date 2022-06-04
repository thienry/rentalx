import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase'

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const cars = await listAvailableCarsUseCase.execute({
      name: req.query.name as string,
      brand: req.query.brand as string,
      category_id: req.query.category_id as string,
    })

    return res.json({ cars })
  }
}

export default new ListAvailableCarsController()
