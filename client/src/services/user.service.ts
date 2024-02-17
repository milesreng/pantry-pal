import authHeader from './auth-header'

class UserService {
  async getUserContent() {
    return await fetch('api/users', {
      method: 'GET',
      headers: authHeader()
    })
  }
}

export default new UserService()