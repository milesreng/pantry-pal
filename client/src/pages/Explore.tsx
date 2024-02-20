/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react"
import exploreService from "../services/explore.service"

import { RecipeDetailsType } from "../types/recipe.type"

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
          { recipes.map((recipe, idx) => (
            <div key={idx}>
              { recipe.title}
            </div>
          ))}
        </div>
      ) : ( loading ? (
        <div className='text-2xl p-12'>
          Loading...
        </div>
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