import 'reflect-metadata'

import { AppError } from '@core/errors/AppError'
import { INCORRECT_EMAIL_OR_PASSWORD } from '@shared/utils/constants'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'

let dateProvider: DayjsDateProvider
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory

describe('Authenticate User', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()

    authenticateUserUseCase = new AuthenticateUserUseCase(
      dateProvider,
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory
    )
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
    ).rejects.toEqual(new AppError(INCORRECT_EMAIL_OR_PASSWORD))
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
    ).rejects.toEqual(new AppError(INCORRECT_EMAIL_OR_PASSWORD))
  })
})
