import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase'

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const all = await listCategoriesUseCase.execute()

    return res.json(all)
  }
}

export default new ListCategoriesController()
