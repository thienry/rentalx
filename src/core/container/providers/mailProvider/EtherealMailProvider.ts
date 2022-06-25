import fs from 'fs'
import handlebars from 'handlebars'
import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from '@core/container/providers/interfaces/IMailProvider'

interface IMailVariable {
  name: string
  link: string
}

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch((err) => console.error(err))
  }

  async sendMail(to: string, subject: string, variables: IMailVariable, path: string) {
    const tplFileContent = fs.readFileSync(path).toString('utf-8')
    const tplParse = handlebars.compile(tplFileContent)
    const tplHTML = tplParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'RentalX <noreply@rentalx.com.br>',
      subject,
      html: tplHTML,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export { EtherealMailProvider }
