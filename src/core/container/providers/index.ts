import { container } from 'tsyringe'

import { IDateProvider } from '@core/container/providers/interfaces/IDateProvider'
import { IMailProvider } from '@core/container/providers/interfaces/IMailProvider'
import { DayjsDateProvider } from '@core/container/providers/dateProvider/DayjsDateProvider'
import { EtherealMailProvider } from '@core/container/providers/mailProvider/EtherealMailProvider'

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
