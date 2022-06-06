import { Router } from 'express'

import { ensureAdmin } from '@core/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createRentalController from '@modules/rentals/useCases/createRental/CreateRentalController'

const rentalsRoutes = Router()

rentalsRoutes.post('/', ensureAuthenticated, ensureAdmin, createRentalController.handle)

export { rentalsRoutes }
