import React, { useState, useEffect, FormEvent } from 'react'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import userService from '../services/user.service'
import exploreService from '../services/explore.service'

import FormDetails from './recipe-form/FormDetails'
import FormIngredients from './recipe-form/FormIngredients'
import FormSteps from './recipe-form/FormSteps'
import FormTags from './recipe-form/FormTags'

import { Recipe, Ingredient, RecipeIngredient, OptionType } from '../types/recipe.type'

const INITIAL_DATA = {
  title: '',
  servings: 1,
  description: '',
  ingredients: [{
    ingredientId: '',
    qty: 1,
    measurement: ''
  }],
  steps: [''],
  tags: [],
  public: false
}

const CreateRecipeForm = () => {
  const [recipeData, setRecipeData] = useState<Recipe>(INITIAL_DATA)

  const [ingredients, setIngredients] = useState<OptionType[] | null>()
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([{
    ingredientId: '',
    qty: 1,
    measurement: ''
  }])

  const updateFields = (fields: Partial<Recipe>) => {
    setRecipeData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { steps, step, stepIdx, handleNext, handlePrev } = useMultiStepForm([
    <FormDetails {...recipeData} updateFields={updateFields} />,
    <FormIngredients {...recipeData} updateFields={updateFields} />,
    <FormSteps {...recipeData} updateFields={updateFields} />,
    <FormTags {...recipeData} updateFields={updateFields} />
  ])

  useEffect(() => {
    const getIngredients = async () => {
      const response = await exploreService.getIngredients()
      const data: Ingredient[] = await response.json()
      const options: OptionType[] = data.map(ingredient => ({
        label: ingredient.name,
        value: ingredient._id
      }))

      setIngredients(options)
    }

    getIngredients()
  }, [])

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleNext()
  }

  const handleCreateRecipe = async () => {
    if (typeof title === 'string') {
      const recipe: Recipe = {
        title,
        description: description ? description : null,
        servings,
        ingredients: recipeIngredients
      }

      await userService.createRecipe(recipe)
    }
  }

  return (
    <div className='my-auto'>
      <p className='text-center'>{stepIdx + 1} / {steps.length}</p>
      <form className='flex flex-col gap-4'
        onSubmit={handleFormSubmit}>
        { step }
        <div className='w-full flex justify-end gap-8'>
          {stepIdx > 0 && (
            <button className='text-slate-800 bg-slate-50 hover:bg-slate-100 py-1 px-2 rounded-md'
              type='button' 
              onClick={handlePrev}>
                previous
            </button>
          )}
          {stepIdx < steps.length - 1 && (
            <button className='bg-slate-600 hover:bg-slate-700 text-white py-1 px-2 rounded-md'
              type='submit'>
                next
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateRecipeForm