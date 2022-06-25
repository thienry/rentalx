import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase'

class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase)
    await sendForgotPasswordMailUseCase.execute(req.body.email)

    return res.send()
  }
}

export default Object.freeze(new SendForgotPasswordMailController())
