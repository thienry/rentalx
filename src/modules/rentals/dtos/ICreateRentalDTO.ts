interface ICreateRentalDTO {
  id?: string
  total?: number
  car_id: string
  user_id: string
  end_date?: Date
  expected_return_date: Date
}

export { ICreateRentalDTO }
