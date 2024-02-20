/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { loggedIn } = useAuth()

  useEffect(() => {
    if (loggedIn) navigate('/dashboard')
  },[])

  return (
    <div className='min-h-screen w-full'>
      
    </div>
  )
}

export default Home