import { Router } from 'express'

import refreshTokenController from '@modules/accounts/useCases/refreshToken/RefreshTokenController'
import authenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authenticateRoutes = Router()

authenticateRoutes.post('/session', authenticateUserController.handle)
authenticateRoutes.post('/refresh-token', refreshTokenController.handle)

export { authenticateRoutes }
