import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { RefreshTokenUseCase } from '@modules/accounts/useCases/refreshToken/RefreshTokenUseCase'

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.body.token || req.headers['x-access-token'] || req.query.token
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const refreshToken = await refreshTokenUseCase.execute(token)

    return res.json(refreshToken)
  }
}

export default Object.freeze(new RefreshTokenController())
