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

      if (!res.ok) throw new Error('login failed')

      const data = await res.json()

      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken)
      }

      return data
    } catch(e: unknown) {
      if (e instanceof Error) console.error(e.message)
    } 
  }

  logout() { localStorage.removeItem('accessToken') }

  async register(username: string, first: string, email: string, password: string) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({username, first, email, password})
      })

      if (!res.ok) throw new Error('registration failed')

      const data = await res.json()

      return data
    } catch (e: unknown) {
      if (e instanceof Error) console.error(e.message)
    }
  }
}

export default new AuthService()