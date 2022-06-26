import { container } from 'tsyringe'

import { DATE_PROVIDER } from '@shared/utils/constants'
import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { DayjsDateProvider } from '@shared/providers/dateProvider/DayjsDateProvider'

container.registerSingleton<IDateProvider>(DATE_PROVIDER, DayjsDateProvider)
