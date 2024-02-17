export interface User {
  message: string | null,
  username: string,
  firstname: string,
  lastname: string | null,
  email: string,
  birthDate: Date | null
}