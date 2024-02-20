export default function authHeader() {
  const token = localStorage.getItem('accessToken')

  if (token) {
    return { 
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }

  return { 'Content-Type': 'application/json', 'x-access-token': '' }
}