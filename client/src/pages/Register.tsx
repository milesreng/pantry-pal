/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import authService from '../services/auth.service'

const Register = () => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [first, setFirst] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true)

  const handleRegister = async () => {
    const response = await authService.register(username, first, email, password)

    if (response.ok) {
      navigate('/login')
    }
  }

  return (
    <div className='w-full bg-slate-50 min-h-screen mt-[-48px] flex justify-center items-center'>
      <div className='bg-slate-200 w-11/12 md:w-1/2 lg:w-1/3 p-2 h-fit py-4'>
        <p className='text-xl text-center pb-2'>Register</p>
        <form className='flex flex-col gap-4 w-11/12 mx-auto'>
          <div className='w-full'>
            <input className='py-1 px-2 w-full rounded-full'
              type="text"
              name='first'
              onChange={e => setFirst(e.target.value)} 
              required
              placeholder='First Name' />
          </div>
          <div className='w-full'>
            <input className='py-1 px-2 w-full rounded-full'
              type="text"
              name='email'
              onChange={e => setEmail(e.target.value)} 
              required
              placeholder='Email' />
          </div>
          <div className='w-full'>
            <input className='py-1 px-2 w-full rounded-full'
              type="text"
              name='username'
              onChange={e => setUsername(e.target.value)} 
              required
              placeholder='Username' />
          </div>
          <div className='w-full'>
            <input className='py-1 px-2 w-full rounded-full'
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
                e.target.value === confirmPassword ? setPasswordMatch(true) : setPasswordMatch(false)
              }}
              placeholder='Password'
              required />
          </div>
          <div className='w-full'>
            <input className='py-1 px-2 w-full rounded-full'
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                password === e.target.value ? setPasswordMatch(true) : setPasswordMatch(false)
              }}
              placeholder='Confirm Password'
              required />
          </div>
          {!passwordMatch && (
            <p className='text-red-800'>
              <FontAwesomeIcon icon={faX} />
              <span className='pl-1'>Passwords do not match</span>
            </p>
          )}
          <button className='bg-slate-500 w-1/2 rounded-md text-white py-1 hover:bg-slate-600 transition-all duration-200 mx-auto'
            onClick={handleRegister}>
            Create account
          </button>
          <p className='text-center flex gap-1 justify-center'>
            <span>
              Already have an account?
            </span>
            <Link to='/login' className='underline'>Log in.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register