/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, FormEvent } from 'react'
import userService from '../services/user.service'
import { User } from '../types/user.type'
import { useNavigate } from 'react-router'

const Profile = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>()
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const res = await userService.getUserContent()

      if (res && res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        navigate('/')
      }
    }

    getUser()
  }, [])

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await userService.updateUserContent(e.username)
    } catch (err: unknown) {
      
    }
  }

  return (
    <div className='w-full min-h-screen px-4'>
      <div className='flex gap-12 mx-auto w-11/12 bg-slate-300 py-12 px-4'>
        <div className='basis-1/3 flex flex-col gap-4'>
          <div className='bg-slate-600 bg-opacity-25 aspect-square w-5/6 rounded-full'>
            {/* <img src='' />  */}
            <p className='text-center py-24'>profile pic goes here</p>
          </div>
          {user && (showEdit ? (
            <form className='flex flex-col gap-2' onSubmit={handleSaveChanges}>
              <input name='username' type="text" />
              <span>{user.email}</span>
              <span>{user.firstname}</span>
              {user.lastname && (<span>{user.lastname}</span>)}
              <span>Member since {user.createdAt}</span>
              <span onClick={handleSaveChanges}>save</span>
            </form>
          ) : (
            <div className='flex flex-col gap-2'>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.firstname}</span>
              {user.lastname && (<span>{user.lastname}</span>)}
              <span>Member since {user.createdAt.slice(0, 4)}</span>
              <span onClick={() => setShowEdit(true)}>edit</span>
            </div>
          ))}
        </div>
        <div className='basis-2/3'>
          more text
          details
        </div>
      </div>
      
    </div>
  )
}

export default Profile