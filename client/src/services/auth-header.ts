export default function authHeader() {
  const token = localStorage.getItem('accessToken')

  if (token) {
    return { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  return { 'Content-Type': 'application/json', Authorization: '' }
}