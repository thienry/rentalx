import fs from 'fs'
import handlebars from 'handlebars'
import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from '@shared/providers/interfaces/IMailProvider'

interface IMailVariable {
  name: string
  link: string
}

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.createClient()
  }

  private async createClient(): Promise<void> {
    try {
      const account = await nodemailer.createTestAccount()

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`)
    }
  }

  async sendMail(
    to: string,
    subject: string,
    variables: IMailVariable,
    path: string
  ): Promise<void> {
    if (!this.client) await this.createClient()

    const tplFileContent = fs.readFileSync(path).toString('utf-8')
    const tplParse = handlebars.compile(tplFileContent)
    const tplHTML = tplParse(variables)

    await this.client.sendMail({
      to,
      from: 'RentalX <noreply@rentalx.com.br>',
      subject,
      html: tplHTML,
    })
  }
}

export { EtherealMailProvider }
