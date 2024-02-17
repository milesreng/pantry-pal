import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserService from '../services/user.service'
import { User } from '../types/user.type'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

  const [user, setUser] = useState<User | null>(null)

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
    <div>
      <div className='w-full border-b-2 bg-slate-800 text-white border-b-black py-2 px-4 flex justify-between fixed font-header text-lg'>
        <div>
          <Link to='/'>
            <FontAwesomeIcon icon={faUtensils} /> Pantry Pal
          </Link>
        </div>
        {user && (
          <div className='flex gap-16'>
            <Link to='/'>Explore</Link>
            <Link to='/'>My Recipes</Link>
            <Link to='/'>Shopping Lists</Link>
          </div>
        )}
        <div className='flex gap-4'>
          {user && (
            <>
              Hi, {user.firstname}
            </>
          )}
          {!user && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>)}
        </div>
      </div>
      <div className='pt-10 font-content'>
        <Outlet />
      </div>
    </div>
  )
}

export default Navbar