import { container } from 'tsyringe'

import { MAIL_PROVIDER } from '@shared/utils/constants'
import { IMailProvider } from '@shared/providers/interfaces/IMailProvider'
import { SESMailProvider } from '@shared/providers/mailProvider/SESMailProvider'
import { EtherealMailProvider } from '@shared/providers/mailProvider/EtherealMailProvider'

const mailProvider = {
  ses: container.resolve(SESMailProvider),
  ethereal: container.resolve(EtherealMailProvider),
}

container.registerInstance<IMailProvider>(MAIL_PROVIDER, mailProvider[process.env.MAIL_PROVIDER])
