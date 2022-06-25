import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ResetPasswordUserUseCase } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserUseCase'

class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)

    await resetPasswordUserUseCase.execute({
      token: String(req.query.token),
      password: req.body.password,
    })

    return res.send()
  }
}

export default Object.freeze(new ResetPasswordUserController())
