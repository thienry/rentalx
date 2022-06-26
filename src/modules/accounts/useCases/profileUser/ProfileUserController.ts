import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ProfileUserUseCase } from '@modules/accounts/useCases/profileUser/ProfileUserUseCase'

class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const profileUserUseCase = container.resolve(ProfileUserUseCase)
    const user = await profileUserUseCase.execute(req.user.id)

    return res.json(user)
  }
}

export default Object.freeze(new ProfileUserController())
