import { Router } from 'express'

import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createRentalController from '@modules/rentals/useCases/createRental/CreateRentalController'
import devolutionRentalController from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import listRentalsByUserController from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'

const rentalsRoutes = Router()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalsRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle)
rentalsRoutes.post('/devolution/:rental_id', ensureAuthenticated, devolutionRentalController.handle)

export { rentalsRoutes }
