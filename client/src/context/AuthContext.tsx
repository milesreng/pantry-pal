import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}: Props) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => setLoggedIn(true)
  const logout = () => setLoggedIn(false)

  return (
    <AuthContext.Provider value={{loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )

}