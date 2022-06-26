// Providers and Repositories
export const DATE_PROVIDER = 'DATE_PROVIDER' as const
export const MAIL_PROVIDER = 'MAIL_PROVIDER' as const
export const CARS_REPOSITORY = 'CARS_REPOSITORY' as const
export const STORAGE_PROVIDER = 'STORAGE_PROVIDER' as const
export const USERS_REPOSITORY = 'USERS_REPOSITORY' as const
export const RENTALS_REPOSITORY = 'RENTALS_REPOSITORY' as const
export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY' as const
export const CARS_IMAGES_REPOSITORY = 'CARS_IMAGES_REPOSITORY' as const
export const USERS_TOKENS_REPOSITORY = 'USERS_TOKENS_REPOSITORY' as const
export const SPECIFICATIONS_REPOSITORY = 'SPECIFICATIONS_REPOSITORY' as const

// Accounts errors messages
export const INVALID_TOKEN = 'Invalid token!' as const
export const TOKEN_EXPIRED = 'Token expired!' as const
export const USER_NOT_FOUND = 'User not found!' as const
export const USER_EXISTS = 'User already exists!' as const
export const REFRESH_TOKEN_NOT_FOUND = 'Refresh token not found!' as const
export const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password!' as const

// Cars errors messages
export const CAR_EXISTS = 'Car exists!' as const
export const CAR_NOT_FOUND = 'Car not found!' as const
export const CAR_UNAVAILABLE = 'Car Unavailable!' as const
export const CATEGORY_EXISTS = 'Category exists!' as const

// Rentals errors messages
export const RENTAL_NOT_FOUND = 'Rental not found!' as const
export const RENTAL_IN_PROGRESS = 'Rental in progress!' as const
export const INVALID_RETURN_TIME = 'Invalid return time!' as const
export const SPECIFICATION_EXISTS = 'Specification exists!' as const
