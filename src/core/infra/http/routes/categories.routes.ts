import multer from 'multer'
import { Router } from 'express'

import { ensureAdmin } from '@core/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController'
import importCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController'
import listCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController'

const categoriesRoutes = Router()

const upload = multer({ dest: './tmp' })

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
)

export { categoriesRoutes }
