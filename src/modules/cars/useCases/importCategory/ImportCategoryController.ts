import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ImportCategoryUseCase } from '@modules/cars/useCases/importCategory/ImportCategoryUseCase'

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    const categories = await importCategoryUseCase.execute(file)

    return res.status(201).send({ categories })
  }
}

export default new ImportCategoryController()
