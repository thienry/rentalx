import { container, delay } from 'tsyringe'

import { IStorageProvider } from '@shared/providers/interfaces/IStorageProvider'
import { S3StorageProvider } from '@shared/providers/storageProvider/S3StorageProvider'
import { LocalStorageProvider } from '@shared/providers/storageProvider/LocalStorageProvider'

const diskStorage = {
  s3: container.resolve(S3StorageProvider),
  local: container.resolve(LocalStorageProvider),
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  delay(() => diskStorage[process.env.STORAGE_MODE])
)
