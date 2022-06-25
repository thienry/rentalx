interface IDateProvider {
  dateNow(): Date
  addDays(days: number): Date
  convertToUTC(date: Date): string
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
}

export { IDateProvider }
