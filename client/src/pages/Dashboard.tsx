import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../services/user.service'
import { User } from '../types/user.type'

import { Recipe } from '../types/recipe.type'

const Dashboard = () => {
  const [user, setUser] = useState<User | null>()
  const [recipes, setRecipes] = useState<Recipe[] | null>()

  useEffect(() => {
    if (localStorage.accessToken) {
      fetchUser()
      fetchRecipes()
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

  const fetchRecipes = async () => {
    if (!user) return
    const response = await UserService.getUserRecipes(user._id)

    if (response && response.ok) {
      setRecipes(await response.json())
    } else {
      setRecipes([])
    }
  }

  return (
    <div className='w-full min-h-screen pt-2'>
      <div className='flex flex-col w-3/4 mx-auto p-4'>
        <p className='text-2xl font-bold'>Your Recipes</p>
        <div className='flex gap-4'>
          <div className='border-2 border-slate-400 basis-1/4 p-4'>
            <Link to='/create-recipe'>+ Create new recipe</Link>
          </div>
          {recipes && recipes.map((recipe, idx) => (
            <div key={idx}>
              <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
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