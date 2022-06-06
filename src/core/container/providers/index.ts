import { container } from 'tsyringe'

import { DayjsDateProvider } from '@core/container/providers/dateProvider/DayjsDateProvider'
import { IDateProvider } from '@core/container/providers/dateProvider/interfaces/IDateProvider'

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
