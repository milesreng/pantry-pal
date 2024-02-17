import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'

interface UserData {
  username: string,
  email: string,
  prevState: null
}

const Navbar = () => {

  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    if (localStorage.token) {
      fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then(res => res.json())
        .then(data => data.error ? setUser(null) : setUser(data))
        .catch(e => {
          console.log(e)
        })
    }
  }, [localStorage.token])

  return (
    <div>
      <div className='w-full border-b-2 bg-slate-800 text-white border-b-black py-2 px-4 flex justify-between fixed'>
        <div>
          <Link to='/'>Pantry Pal</Link>
        </div>
        <div className='flex gap-4'>
          {!user && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>)}
        </div>
      </div>
      <div className='pt-8'>
        <Outlet />
      </div>
    </div>
  )
}

export default Navbar