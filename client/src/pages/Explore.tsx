/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import exploreService from '../services/explore.service'
import RecipeCard from '../components/recipe-form/RecipeCard'

import LoadingIndicator from '../components/LoadingIndicator'
import { RecipeDetailsType } from '../types/recipe.type'

const Explore = () => {
  const [recipes, setRecipes] = useState<RecipeDetailsType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const getRecipes = async () => {
      setLoading(true)
      const response = await exploreService.getRecipes()

      const data = await response.json()

      if (response.ok) {
        setRecipes(data)
      }

      setLoading(false)
    }

    getRecipes()

  }, [])

  return (
    <div className='w-full min-h-screen'>
      { (recipes.length > 0) ? (
        <div className='text-2xl p-12'>
          Recipes
          <div className='text-lg flex flex-wrap gap-4 py-4'>
            { recipes.map((recipe, idx) => (
              <Link key={idx} to={`/recipe/${recipe._id}`} className='basis-1/2 md:basis-1/4 aspect-square'>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        </div>
      ) : ( loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <div className='text-2xl p-12'>
            Request failed
          </div>
        </div>
      ))}
    </div>
  )
}

export default Explore