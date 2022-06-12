import { Router } from 'express'

import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createRentalController from '@modules/rentals/useCases/createRental/CreateRentalController'
import devolutionRentalController from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'

const rentalsRoutes = Router()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalsRoutes.post('/devolution/:rental_id', ensureAuthenticated, devolutionRentalController.handle)

export { rentalsRoutes }
