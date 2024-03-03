export enum RegisterError {
  EMAIL_OR_USERNAME_ALREADY_EXISTS = 'EMAIL_OR_USERNAME_ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_USERNAME = 'INVALID_USERNAME',
  UNKNOWN = 'UNKNOWN',
}
export enum ResetPasswordError {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_EMAIL = 'INVALID_EMAIL',
  RESET_PASSWORD_ALREADY_REQUESTED = 'RESET_PASSWORD_ALREADY_REQUESTED',
  INVALID_TOKEN = 'INVALID TOKEN',
  USER_NOT_REQUESTING_RESET_PASSWORD = 'USER_NOT_REQUESTING_RESET_PASSWORD',
  UNKNOWN = 'UNKNOWN',
}