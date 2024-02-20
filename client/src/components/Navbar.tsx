/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserService from '../services/user.service'
import { User } from '../types/user.type'
import LogoutModal from './LogoutModal'

import { useAuth } from '../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { loggedIn, logout } = useAuth()

  const [showDropdown, setShowDropdown] = useState(false)
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
        <div className='basis-1/6'>
          <Link to='/' className='hover:text-slate-200 transition-all duration-200 flex align-middle gap-2'>
            <FontAwesomeIcon icon={faUtensils} className='my-auto' /> <span className='my-auto'>Pantry Pal</span>
          </Link>
        </div>
        <div className='flex gap-16 basis-2/3 text-center justify-center'>
          <Link to='/explore' className='hover:text-slate-200 transition-all duration-200'>Explore</Link>
          {loggedIn && (
            <>
              <Link to='/dashboard' className='hover:text-slate-200 transition-all duration-200'>Create A Recipe</Link>
              {/* <Link to='/' className='hover:text-slate-200 transition-all duration-200'>Shopping Lists</Link> */}
            </>
          )}
        </div>
        <div className='flex gap-8 basis-1/6 justify-end text-sm'>
          {/* {loggedIn && user && (
            <>
              Hi, {user.firstname}
            </>
          )} */}
          {loggedIn && user ? (
            <>
              <button onClick={() => {
                if (showDropdown) {
                  setShowDropdown(false)
                } else {
                  setShowDropdown(true)
                }}}>Account</button>
              {showDropdown && (
                <div className='absolute flex flex-col bg-slate-200 text-slate-900 mt-8 px-2 rounded-sm text-right'>
                  <span className='py-1 pl-4'>Profile</span>
                  <span className='py-1 pl-4'>Settings</span>
                  <span className='py-1'>Log out</span>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to='/login' className='hover:text-slate-200 transition-all duration-200 my-auto'>Login</Link>
              <Link to='/register' className='hover:text-slate-200 transition-all duration-200 my-auto'>Register</Link>
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