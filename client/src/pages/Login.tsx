/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'

import AuthService from '../services/auth.service'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const [email, setEmail] = useState<string | null>()
  const [password, setPassword] = useState<string | null>()

  const [errorMessage, setErrorMessage] = useState<string | null>()

  const handleLogin = async () => {
    if (typeof email === 'string' && typeof password === 'string') {

      if (!validator.isEmail(email)) {
        setErrorMessage('Please enter a valid email.')
      }

      try {
        const response = await AuthService.login(email, password)

        if (response && response.accessToken) {
          login()
          setErrorMessage('')
          navigate('/dashboard')
        } else {
          setErrorMessage('Email or password is incorrect. Please try again.')
        }

      } catch (e: unknown) {
        if (e instanceof Error) {
          setErrorMessage('login failed')
        }
      }
    }
  }

  return (
    <div className='w-full bg-slate-50 min-h-screen mt-[-48px] flex justify-center items-center'>
      <div className='bg-slate-200 w-11/12 md:w-1/2 lg:w-1/3 p-2 h-fit py-4'>
        <p className='text-xl text-center pb-2'>Log in</p>
        <form className='flex flex-col gap-4 w-11/12 mx-auto'
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}>
          {errorMessage && (
            <p>{errorMessage}</p>
          )}
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
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
              required />
          </div>
          <a className='text-right underline' href=''>Forgot password?</a>
          <button className='bg-slate-500 w-1/2 rounded-md text-white py-1 hover:bg-slate-600 transition-all duration-200 mx-auto'
            type='submit'>
            Log in
          </button>
          <p className='text-center flex gap-1 justify-center'>
            <span>
              New to PantryPal?
            </span>
            <Link to='/register' className='underline'>Join now.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login