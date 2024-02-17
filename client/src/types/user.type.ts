export interface LoginResponse {
  message: string | null,
  accessToken: string,
  refreshToken: string,
  username: string,
  firstname: string,
  lastname: string | null,
  email: string,
  birthDate: Date | null
}