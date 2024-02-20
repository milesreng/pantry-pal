/* eslint-disable react/react-in-jsx-scope */
import authService from '../services/auth.service'

const LogoutModal = () => {
  return (
    <button onClick={authService.logout}>
      Logout
    </button>
  )
}

export default LogoutModal