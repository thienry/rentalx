import 'reflect-metadata'

import { AppError } from '@core/errors/AppError'
import { CATEGORY_EXISTS } from '@shared/utils/constants'
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty('id')
  })

  it('Should not be able to create a new category with existent name', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })
    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError(CATEGORY_EXISTS))
  })
})
