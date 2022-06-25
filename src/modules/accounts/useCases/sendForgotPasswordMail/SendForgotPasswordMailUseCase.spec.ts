import { AppError } from '@core/errors/AppError'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/providers/in-memory/MailProviderInMemory'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase'

let dateProvider: DayjsDateProvider
let mailProviderInMemory: MailProviderInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase

describe('Send forgot mail', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    mailProviderInMemory = new MailProviderInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      dateProvider,
      mailProviderInMemory,
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory
    )
  })

  it('Should be able to send a forgot password mail tu an user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail')

    await usersRepositoryInMemory.create({
      password: '1234',
      name: 'Delia Obrien',
      driver_license: '016176',
      email: 'nuicazaw@vojandap.gh',
    })
    await sendForgotPasswordMailUseCase.execute('nuicazaw@vojandap.gh')

    expect(sendMail).toHaveBeenCalled()
  })

  it('Should be able to create an user token', async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      password: '1234',
      name: 'Delia Obrien',
      driver_license: '016176',
      email: 'nuicazaw@vojandap.gh',
    })
    await sendForgotPasswordMailUseCase.execute('nuicazaw@vojandap.gh')

    expect(generateTokenMail).toHaveBeenCalled()
  })

  it('Should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('zibiwtez@tarubi.mc')).rejects.toEqual(
      new AppError('User does not exists!')
    )
  })
})
