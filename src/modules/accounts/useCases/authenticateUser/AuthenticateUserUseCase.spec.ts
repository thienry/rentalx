import { AppError } from '@core/errors/AppError'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test',
      email: 'user@test.com',
      password: 'qwerty',
      driver_license: '00012154',
    }

    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: '1234',
      })
    ).rejects.toEqual(new AppError('Email or password are incorrect!'))
  })

  it('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      email: 'user@test.com',
      name: 'User Test Error',
      password: '1234',
      driver_license: '9999',
    }

    await createUserUseCase.execute(user)
    await expect(
      authenticateUserUseCase.execute({ email: user.email, password: 'incorrectPassword' })
    ).rejects.toEqual(new AppError('Email or password are incorrect!'))
  })
})
