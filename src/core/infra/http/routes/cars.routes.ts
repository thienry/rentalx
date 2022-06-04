import { Router } from 'express'

import { ensureAdmin } from '@core/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import listAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.get('/available', listAvailableCarsController.handle)
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }
