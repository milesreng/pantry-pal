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

      return data
    } catch(e: unknown) {
      if (e instanceof Error) console.error(e.message)
    } 
  }

  logout() { localStorage.removeItem('accessToken') }

  async register(username: string, first: string, email: string, password: string) {
    return await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username, first, email, password})
    })
  }
}

export default new AuthService()