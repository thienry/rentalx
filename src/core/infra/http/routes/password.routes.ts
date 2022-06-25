import { Router } from 'express'

import sendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)

export { passwordRoutes }
