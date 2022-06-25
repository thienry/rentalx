import { IMailProvider } from '@shared/providers/interfaces/IMailProvider'

interface IVariable {
  name: string
  link: string
}

interface IMessage {
  to: string
  path: string
  subject: string
  varibles: IVariable
}

class MailProviderInMemory implements IMailProvider {
  private messages: IMessage[] = []

  async sendMail(to: string, subject: string, varibles: IVariable, path: string): Promise<void> {
    this.messages.push({ to, subject, varibles, path })
  }
}

export { MailProviderInMemory }
