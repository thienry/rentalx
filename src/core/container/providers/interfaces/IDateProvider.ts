interface IDateProvider {
  dateNow(): Date
  convertToUTC(date: Date): string
  addDays(days: number | string): Date
  addHours(hours: number | string): Date
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
  compareIfBefore(startDate: Date, endDate: Date): boolean
}

export { IDateProvider }
