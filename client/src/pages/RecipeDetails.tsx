import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import exploreService from '../services/explore.service'
import { RecipeDetailsType } from '../types/recipe.type'

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<RecipeDetailsType | null>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetchRecipe()
  }, [])

  const fetchRecipe = async () => {
    setLoading(true)
    const response = await exploreService.getRecipe(id as string)
    const data = await response.json()

    if (response.ok) {
      setRecipe(data)
    } else {
      setRecipe(null)
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen'>
      { recipe ? (
        <div className='w-5/6 mx-auto py-8 flex flex-col'>
          <p className='text-2xl font-bold'>
            { recipe.title }
          </p>
          <p>Serves {recipe.servings}</p>
          <div className='w-1/2 aspect-square bg-slate-300 flex justify-center align-middle'>
            <span className='text-center w-full my-auto'>Image here</span>
          </div>
          <p>
            { recipe.description }
          </p>
          <div>
            {recipe.ingredients.map((ingr, idx) => (
              <div key={idx} className='flex gap-4'>
                <span className='font-bold'>{ingr.quantity} {ingr.measurement}</span>
                <span>{ingr.name}</span>
              </div>
            ))}
          </div>
          <div>
            { recipe.steps.map((step, idx) => (
              <div key={idx}>
                {idx + 1}. { step }
              </div>
            ))}
          </div>
        </div>
      ) : (loading ? (
        <div>
          Loading
        </div>
      ) : (
        <div>
          Could not retrieve recipe
        </div>
      ))}
    </div>
  )
}

export default RecipeDetails