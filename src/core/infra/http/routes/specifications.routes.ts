import { Router } from 'express'

import { ensureAdmin } from '@core/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRoutes = Router()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
)

export { specificationsRoutes }
