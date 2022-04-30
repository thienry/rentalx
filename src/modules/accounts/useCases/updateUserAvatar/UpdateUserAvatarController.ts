import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    const avatarFile = req.file.filename
    await updateUserAvatarUseCase.execute({ userId: req.user.id, avatarFile })

    return res.status(204).send()
  }
}

export default new UpdateUserAvatarController()
