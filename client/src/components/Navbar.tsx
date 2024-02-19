import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserService from '../services/user.service'
import { User } from '../types/user.type'

import { useAuth } from '../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { loggedIn, logout } = useAuth()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (loggedIn) fetchUser()
  }, [loggedIn])

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
      <div className='w-full border-b-2 bg-slate-800 text-white border-b-black py-2 px-4 flex justify-between fixed font-header text-xl'>
        <div>
          <Link to='/' className='hover:text-slate-200 transition-all duration-200'>
            <FontAwesomeIcon icon={faUtensils} /> Pantry Pal
          </Link>
        </div>
        <div className='flex gap-16'>
          <Link to='/explore' className='hover:text-slate-200 transition-all duration-200'>Explore</Link>
          {loggedIn && (
            <>
              <Link to='/dashboard' className='hover:text-slate-200 transition-all duration-200'>My Recipes</Link>
              <Link to='/' className='hover:text-slate-200 transition-all duration-200'>Shopping Lists</Link>
            </>
          )}
        </div>
        <div className='flex gap-8'>
          {loggedIn && user && (
            <>
              Hi, {user.firstname}
            </>
          )}
          {loggedIn ? (
            <>
              <Link to='/' className='hover:text-slate-200 transition-all duration-200' onClick={logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to='/login' className='hover:text-slate-200 transition-all duration-200'>Login</Link>
              <Link to='/register' className='hover:text-slate-200 transition-all duration-200'>Register</Link>
            </>)}
        </div>
      </div>
      <div className='pt-10 font-content bg-slate-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default Navbar