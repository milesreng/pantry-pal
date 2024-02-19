import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import exploreService from '../services/explore.service'
import { Recipe } from '../types/recipe.type'

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetchRecipe()
  }, [])

  const fetchRecipe = async () => {
    setLoading(true)
    const response = await exploreService.getRecipe(id as string)

    if (response.ok) {
      setRecipe(await response.json())
    } else {
      setRecipe(null)
    }

    setLoading(false)
  }

  return (
    <div>
      { recipe ? (
        <div>
          { recipe.title }
        </div>
      ) : loading ? (
        <div>
          Loading
        </div>
      ) : (
        <div>
          Could not retrieve recipe
        </div>
      )}
    </div>
  )
}

export default RecipeDetails