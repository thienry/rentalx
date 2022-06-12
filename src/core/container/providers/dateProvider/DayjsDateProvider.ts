import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '@core/container/providers/dateProvider/interfaces/IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate()
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate)
    const endDateUtc = this.convertToUTC(endDate)

    return dayjs(endDateUtc).diff(startDateUtc, 'hours')
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate)
    const endDateUtc = this.convertToUTC(endDate)

    return dayjs(endDateUtc).diff(startDateUtc, 'days')
  }
}

export { DayjsDateProvider }
