import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      name: data.name,
      email: data.email,
      password: data.password,
      driver_license: data.driver_license,
    })

    delete user.password

    return res.status(201).send({ user })
  }
}

export default new CreateUserController()
