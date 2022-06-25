import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate()
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate()
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

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate)
  }
}

export { DayjsDateProvider }
