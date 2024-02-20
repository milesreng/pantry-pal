/* eslint-disable react/react-in-jsx-scope */
import authService from '../services/auth.service'

const LogoutButton = () => {
  return (
    <button onClick={authService.logout}>
      Logout
    </button>
  )
}

export default LogoutButton