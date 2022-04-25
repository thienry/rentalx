import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    const category = await createCategoryUseCase.execute({ name, description })

    return res.status(201).send({ category })
  }
}

export default new CreateCategoryController()
