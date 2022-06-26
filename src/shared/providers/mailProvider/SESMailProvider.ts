import fs from 'fs'
import { SES } from 'aws-sdk'
import handlebars from 'handlebars'
import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from '@shared/providers/interfaces/IMailProvider'

interface IMailVariable {
  name: string
  link: string
}

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      }),
    })
  }

  async sendMail(
    to: string,
    subject: string,
    variables: IMailVariable,
    path: string
  ): Promise<void> {
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

export { SESMailProvider }
