import React from 'react'
import authService from '../services/auth.service'

const LogoutButton = () => {
  return (
    <button onClick={authService.logout}>
      Logout
    </button>
  )
}

export default LogoutButton