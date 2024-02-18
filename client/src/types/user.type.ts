export interface User {
  accessToken: string,
  refreshToken: string,
  _id: string,
  username: string,
  firstname: string,
  lastname: string | null,
  email: string,
  createdAt: string
}