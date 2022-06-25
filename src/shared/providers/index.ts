import { container } from 'tsyringe'

import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { IMailProvider } from '@shared/providers/interfaces/IMailProvider'
import { IStorageProvider } from '@shared/providers/interfaces/IStorageProvider'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'
import { EtherealMailProvider } from '@shared/providers/mailProvider/EtherealMailProvider'
import { LocalStorageProvider } from '@shared/providers/storageProvider/LocalStorageProvider'

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorageProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
