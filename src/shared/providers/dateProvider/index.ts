import { container } from 'tsyringe'

import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)
