interface IDateProvider {
  dateNow(): Date
  convertToUTC(date: Date): string
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
}

export { IDateProvider }
