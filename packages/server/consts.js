export const MISSING_AUTH = 'MISSING_AUTH'
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED'
export const REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED'
export const TOKEN_INVALID = 'TOKEN_INVALID'
export const jwtCustomMessages = {
  noAuthorizationInHeaderMessage: MISSING_AUTH,
  authorizationTokenExpiredMessage: TOKEN_EXPIRED,
  authorizationTokenInvalid: err => {
    return `${TOKEN_INVALID} :: ${err.message}`
  },
}
