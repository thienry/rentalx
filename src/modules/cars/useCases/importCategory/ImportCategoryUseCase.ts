import fs from 'fs'
import { parse } from 'csv-parse'
import { inject, injectable } from 'tsyringe'

import { CATEGORIES_REPOSITORY } from '@shared/utils/constants'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(@inject(CATEGORIES_REPOSITORY) private categoryRepository: CategoriesRepository) {}

  private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      const stream = fs.createReadStream(file.path)
      const parseFile = parse({ delimiter: ',' })
      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line
          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err) => reject(err))
    })
  }

  async execute(file: Express.Multer.File): Promise<IImportCategory[]> {
    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name, description } = category
      const categoryAlreadyExists = await this.categoryRepository.findByName(name)
      if (!categoryAlreadyExists) await this.categoryRepository.create({ name, description })
    })

    return categories
  }
}

export { ImportCategoryUseCase }
