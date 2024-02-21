class AuthService {
  async login(email: string, password: string) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      if (!res.ok) return { message: 'email or password is incorrect' }

      const data = await res.json()

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      return data
    } catch(e: unknown) {
      if (e instanceof Error) console.error(e.message)
    } 
  }

  async tryRefresh(res: Response) {
    const data = await res.json()
    if (data.error !== 'TokenExpiredError') return

    try {
      const token = localStorage.getItem('refreshToken') as string

      const response = await fetch('/api/auth/refresh', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'x-refresh-token': token
        }
      })

      if (!response.ok) {
        this.logout()
        return false
      }

      const data = await response.json()

      // refresh token rotation
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      return true
    } catch (e: unknown) {
      if (e instanceof Error) console.error(e.message)
      return false
    }
  }

  logout() { 
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  async register(username: string, first: string, last: string, email: string, password: string) {
    return await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username, first, last, email, password})
    })
  }
}

export default new AuthService()