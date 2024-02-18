import React, { useState, useEffect } from 'react'
import Select, { ValueType } from 'react-select'

import UserService from '../services/user.service'
import ExploreService from '../services/explore.service'
import { Ingredient, RecipeIngredient, Recipe } from '../types/recipe.type'

interface OptionType {
  label: string,
  value: string
}

const CreateRecipe = () => {
  const [name, setName] = useState<string | null>()
  const [description, setDescription] = useState<string | null>()
  const [servings, setServings] = useState<number | null>()
  const [ingredients, setIngredients] = useState<OptionType[] | null>()
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([{
    ingredientId: '',
    qty: 1,
    measurement: ''
  }])

  useEffect(() => {
    const getIngredients = async () => {
      const response = await ExploreService.getIngredients()
      const data: Ingredient[] = await response.json()
      const options: OptionType[] = data.map(ingredient => ({
        label: ingredient.name,
        value: ingredient._id
      }))

      setIngredients(options)
    }

    getIngredients()
  }, [])

  const handleCreateRecipe = async () => {
    if (typeof name === 'string' && typeof servings === 'number') {
      const recipe: Recipe = {
        title: name,
        description: description ? description : null,
        servings,
        ingredients: recipeIngredients
      }

      await UserService.createRecipe(recipe)
    }
  }

  const handleAddIngredient = () => {
    const newField: RecipeIngredient = { ingredientId: '', qty: 1, measurement: '' }
    setRecipeIngredients([...recipeIngredients, newField])
  }

  const handleCreateIngredient = async () => {
    
  }

  const handleInputChange = (idx: number, option: ValueType<OptionType, false>) => {
    const newIngredients = [...recipeIngredients]
    const selected = option as OptionType
    newIngredients[idx].ingredientId = selected.value

    setRecipeIngredients(newIngredients)
  }

  return (
    <div className='w-full min-h-screen flex justify-center'>
      <div className='w-11/12 md:w-1/2 my-4'>
        <p className='font-bold text-xl text-center py-4'>Create Recipe</p>
        <form className='flex flex-col gap-4'
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateRecipe()
          }}>
          <div className='flex gap-8'>
            <p className='w-1/4 text-right'>Name *</p>
            <input className='w-7/12 py-1 px-2'
              onChange={(e) => setName(e.target.value)}
              required
              type="text" />
          </div>
          <div className='flex gap-8'>
            <p className='w-1/4 text-right'>Servings *</p>
            <input className='w-7/12 py-1 px-2'
              type="number" />
          </div>
          <div className='flex gap-8'>
            <p className='w-1/4 text-right'>Description</p>
            <textarea 
              className='w-7/12 py-1 px-2' 
              name='description'
              onChange={(e) => setDescription(e.target.value)} />
          </div>
          {ingredients && ingredients.map((ingr, idx) => (<p key={idx}>{JSON.stringify(ingr)}</p>))}
          { recipeIngredients && recipeIngredients.map((ingr, idx) => (
            <div className='flex gap-8' key={idx}>
              <p className='w-1/4'></p>
              <div className='flex gap-4'>
                {ingredients && (<Select
                  name='ingredientId'
                  value={ingredients?.find(option => option.value === ingr.ingredientId)}
                  onChange={(option) => handleInputChange(idx, option)}
                  options={ingredients} />)}
                <input type="number" />
                <input type="text" />
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe