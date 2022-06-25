import { Router } from 'express'

import resetPasswordUserController from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController'
import sendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

passwordRoutes.post('/reset', resetPasswordUserController.handle)
passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)

export { passwordRoutes }
