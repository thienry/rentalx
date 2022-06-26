import multer from 'multer'
import { Router } from 'express'

import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '@core/infra/http/middlewares/ensureAuthenticated'
import createUserController from '@modules/accounts/useCases/createUser/CreateUserController'
import profileUserController from '@modules/accounts/useCases/profileUser/ProfileUserController'
import updateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
