/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import exploreService from '../../services/explore.service'

import { Recipe } from '../../types/recipe.type'
import { Ingredient } from '../../types/recipe.type'

type FormSummaryProps = {
  recipe: Recipe
}

const FormSummary = ({ recipe }: FormSummaryProps) => {
  const [loading, setLoading] = useState(false)
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([])

  useEffect(() => {
    getIngredients()
  }, [])

  const getIngredients = async () => {
    console.log('set loading')
    setLoading(true)
    const response = await exploreService.getIngredients()
    const data: Ingredient[] = await response.json()

    setIngredientList(data)
    setLoading(false)
    console.log('set loading false')
  }

  return (
    <div>
      <p className='text-center text-xl font-bold pb-4'>Your New Recipe</p>

      { loading ? (
        <div>loading</div>
      ) : (
        <div className='flex flex-col gap-4 align-middle mx-auto'>
          <div className='flex mx-auto gap-4 w-full'>
            <span className='basis-1/2 text-slate-600 text-right'>Name </span>
            <span className='basis-1/2'>{ recipe.title }</span>
          </div>
          <div className='flex mx-auto gap-4 w-full'>
            <span className='basis-1/2 text-slate-600 text-right'>Serves </span>
            <span className='basis-1/2'>{ recipe.servings }</span>
          </div>
          <div className='flex mx-auto gap-4 w-full'>
            <span className='basis-1/2 text-slate-600 text-right'>Description </span>
            <span className='basis-1/2'>{ recipe.description || '[empty]' }</span>
          </div>
          <div className='flex mx-auto gap-4 w-full'>
            <span className='basis-1/2 text-slate-600 text-right'>Ingredients </span>
            <span className='basis-1/2'>{ ingredientList && recipe.ingredients && ingredientList.filter((ingr) => recipe.ingredients.map((ingr) => ingr.ingredient).includes(ingr._id)).map((ingr, idx) => (
              <div className='' key={idx}>
                { ingr.name }
              </div>
            )) }</span>
          </div>
        </div>)}
    </div>
  )
}

export default FormSummary