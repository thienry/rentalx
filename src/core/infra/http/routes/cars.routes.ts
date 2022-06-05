import { Router } from 'express'

import { ensureAdmin } from '@core/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createCarController from '@modules/cars/useCases/createCar/CreateCarController'
import listAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import createCarSpecificationsController from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController'

const carsRoutes = Router()

carsRoutes.get('/available', listAvailableCarsController.handle)
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
)

export { carsRoutes }
