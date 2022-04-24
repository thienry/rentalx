import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      driver_license: data.driver_license,
    })

    return res.status(201).send()
  }
}

export { CreateUserController }
