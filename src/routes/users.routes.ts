import { Router } from 'express'

import createUserController from '../modules/accounts/useCases/createUser/CreateUserController'

const usersRoutes = Router()

usersRoutes.post('/', createUserController.handle)

export { usersRoutes }
