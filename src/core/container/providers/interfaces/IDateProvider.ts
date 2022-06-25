interface IDateProvider {
  dateNow(): Date
  addDays(days: number): Date
  addHours(hours: number): Date
  convertToUTC(date: Date): string
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
  compareIfBefore(startDate: Date, endDate: Date): boolean
}

export { IDateProvider }
