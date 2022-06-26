import { container } from 'tsyringe'

import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { IMailProvider } from '@shared/providers/interfaces/IMailProvider'
import { IStorageProvider } from '@shared/providers/interfaces/IStorageProvider'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'
import { S3StorageProvider } from '@shared/providers/storageProvider/S3StorageProvider'
import { EtherealMailProvider } from '@shared/providers/mailProvider/EtherealMailProvider'
import { LocalStorageProvider } from '@shared/providers/storageProvider/LocalStorageProvider'

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.STORAGE_MODE]
)
