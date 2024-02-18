import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    <div className='w-full min-h-screen pt-2'>
      <div className='container flex flex-col w-3/4 mx-auto'>
        <p>Your Recipes</p>
        <Link to='/create-recipe'>+ Create new recipe</Link>
      </div>
      {user && user.email}
    </div>
  )
}

export default Dashboard