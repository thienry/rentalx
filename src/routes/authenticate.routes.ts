import { Router } from 'express'

import authenticateUserController from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authenticateRoutes = Router()

authenticateRoutes.post('/session', authenticateUserController.handle)

export { authenticateRoutes }
