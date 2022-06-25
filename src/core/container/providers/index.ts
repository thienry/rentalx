import { container } from 'tsyringe'

import { IDateProvider } from '@core/container/providers/interfaces/IDateProvider'
import { IMailProvider } from '@core/container/providers/interfaces/IMailProvider'
import { DayjsDateProvider } from '@core/container/providers/dateProvider/DayjsDateProvider'
import { LocalStorageProvider } from '@core/container/providers/storageProvider/LocalStorageProvider'
import { EtherealMailProvider } from '@core/container/providers/mailProvider/EtherealMailProvider'

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorageProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
