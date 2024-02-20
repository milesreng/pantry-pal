/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import userService from '../services/user.service'

import FormDetails from './recipe-form/FormDetails'
import FormIngredients from './recipe-form/FormIngredients'
import FormSteps from './recipe-form/FormSteps'
import FormTags from './recipe-form/FormTags'

import { Recipe } from '../types/recipe.type'

const INITIAL_DATA = {
  title: '',
  servings: 1,
  description: '',
  ingredients: [{
    ingredient: '',
    qty: '1',
    measurement: ''
  }],
  steps: [''],
  tags: [],
  public: false
}

const CreateRecipeForm = () => {
  const navigate = useNavigate()

  const [recipeData, setRecipeData] = useState<Recipe>(INITIAL_DATA)

  const updateFields = (fields: Partial<Recipe>) => {
    setRecipeData(prev => {
      return { ...prev, ...fields }
    })

    console.log(recipeData)
  }

  const { steps, step, stepIdx, handleNext, handlePrev } = useMultiStepForm([
    <FormDetails {...recipeData} updateFields={updateFields} />,
    <FormIngredients {...recipeData} updateFields={updateFields} />,
    <FormSteps {...recipeData} updateFields={updateFields} />,
    <FormTags {...recipeData} updateFields={updateFields} />
  ])

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleNext()
  }

  const handleCreateRecipe = async (e: FormEvent) => {
    e.preventDefault()
    // console.log(recipeData)
    const response = await userService.createRecipe(recipeData)
    const data = await response.json()

    if (response.ok) {
      navigate(`/recipe/${data._id}`)
    } else {
      console.log(data)
    }
  }

  return (
    <div className='my-auto w-3/4 mx-auto bg-slate-200 py-4 px-12 rounded-md'>
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
          {stepIdx < steps.length - 1 ? (
            <button className='bg-slate-600 hover:bg-slate-700 text-white py-1 px-2 rounded-md'
              type='submit'>
                next
            </button>
          ) : (
            <button className='bg-slate-600 hover:bg-slate-700 text-white py-1 px-2 rounded-md'
              onClick={handleCreateRecipe}
              type='submit'>
                submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateRecipeForm