import multer from 'multer'
import { Router } from 'express'

import uploadConfig from '@config/upload'
import { ensureAdmin } from '@core/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createCarController from '@modules/cars/useCases/createCar/CreateCarController'
import uploadCarsImagesController from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'
import listAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import createCarSpecificationsController from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController'

const carsRoutes = Router()
const uploadCarImages = multer(uploadConfig)

carsRoutes.get('/available', listAvailableCarsController.handle)
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarsImagesController.handle
)
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
)

export { carsRoutes }
