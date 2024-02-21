/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import UserService from '../services/user.service'
import { User } from '../types/user.type'

import { useAuth } from '../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const navigate = useNavigate()

  const { loggedIn, logout } = useAuth()

  const [showDropdown, setShowDropdown] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showConfirmLoggedOut, setShowConfirmLoggedOut] = useState(false)

  useEffect(() => {
    if (loggedIn) fetchUser()
  }, [loggedIn])

  const fetchUser = async () => {
    const response = await UserService.getUserContent()

    if (response && response.ok) {
      const data = await response.json()
      setUser(data)
    } else {
      setUser(null)
    }
  }

  const handleLogout = () => {
    setShowConfirmLoggedOut(false)
    logout()
    navigate('/')
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
                }}}>{user.firstname}</button>
              {showDropdown && (
                <div className='absolute flex flex-col bg-slate-200 text-slate-900 mt-8 px-2 pb-2 rounded-sm text-center w-1/6'>
                  <div className='rounded-full aspect-square w-5/6 md:w-1/3 mx-auto bg-slate-300 mt-8 mb-4'>

                  </div>
                  <span>{user.firstname} {user.lastname}</span>
                  <span className='mb-4'>Logged in as <br /> {user.email} </span>
                  <span className='py-1 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200'><Link to='/profile'>Profile</Link></span>
                  <span className='py-1 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all duration-200'>Settings</span>
                  <span className='py-1 hover:cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200' onClick={() => setShowConfirmLoggedOut(true)}>Log out</span>
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
      { showConfirmLoggedOut && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              {/* <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">
                    &#9888;
                  </i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">You will lose all of your data by deleting this. This action cannot be undone.
                  </p>
                </div>
              </div> */}
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button id="confirm-delete-btn" onClick={handleLogout} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                        Log out
                </button>
                <button type='button' onClick={() => setShowConfirmLoggedOut(false)} id="confirm-cancel-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                    Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar