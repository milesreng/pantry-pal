import React, { useState, useEffect } from 'react'
import UserService from '../services/user.service'

import { User } from '../types/user.type'

const Dashboard = () => {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    if (localStorage.accessToken) {
      fetchUser()
    }
  }, [localStorage.accessToken])

  const fetchUser = async () => {
    const response = await UserService.getUserContent()

    if (response && response.ok) {
      setUser(await response.json())
    } else {
      setUser(null)
    }
  }

  return (
    <div className='w-full min-h-screen bg-slate-100 pt-2'>
      {user && user.email}
    </div>
  )
}

export default Dashboard