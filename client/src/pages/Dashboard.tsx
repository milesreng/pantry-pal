/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserService from '../services/user.service'
import { User } from '../types/user.type'
import RecipeCard from '../components/recipe-form/RecipeCard'

import { RecipeDetailsType } from '../types/recipe.type'

const Dashboard = () => {
  const { loggedIn } = useAuth()

  const [user, setUser] = useState<User | null>()
  const [recipes, setRecipes] = useState<RecipeDetailsType[] | null>()

  useEffect(() => {
    if (loggedIn) {
      fetchUser()
      fetchRecipes()
    }
  }, [loggedIn])

  const fetchUser = async () => {
    const response = await UserService.getUserContent()

    if (response && response.ok) {
      setUser(await response.json())
    } else {
      setUser(null)
    }
  }

  const fetchRecipes = async () => {
    const response = await UserService.getUserRecipes()

    if (response && response.ok) {
      const data = await response.json()
      setRecipes(data)
    } else {
      setRecipes([])
    }
  }

  return (
    <div className='w-full min-h-screen pt-2'>
      <div className='flex flex-col w-3/4 mx-auto p-4'>
        { user && (
          <p className='text-2xl'>Hi, {user.firstname}</p>
        ) }
        <p className='text-2xl font-bold pb-4'>Your Recipes</p>
        <div className='flex gap-4'>
          <div className='basis-1/4 p-4 aspect-square text-center align-middle flex'>
            <Link className='my-auto' to='/create-recipe'>+ Create new recipe</Link>
          </div>
          {recipes && recipes.map((recipe, idx) => (
            <div key={idx} className='basis-1/4 aspect-square'>
              <Link to={`/recipe/${recipe._id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col w-3/4 mx-auto p-4'>
        <p className='text-2xl font-bold'>Recently Viewed</p>
      </div>
    </div>
  )
}

export default Dashboard