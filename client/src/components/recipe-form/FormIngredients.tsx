import React from 'react'
import Select from 'react-select'
import { OptionType, RecipeIngredient } from '../../types/recipe.type'
import FormWrapper from '../FormWrapper'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type FormIngredientsData = {
  ingredients: RecipeIngredient[],
  ingredientList: OptionType[]
}

type FormIngredientsProps = FormIngredientsData & {
  updateFields: (fields: Partial<FormIngredientsData>) => void
}

const measurementList = [{
  label: 'cups',
  value: 'cups'
}, {
  label: 'tsp',
  value: 'tsp'
}, {
  label: 'tbsp',
  value: 'tbsp'
}, {
  label: 'oz',
  value: 'oz'
},]

const FormIngredients = ({ ingredientList, ingredients, updateFields }: FormIngredientsProps) => {
  const handleUpdateIngredientId = (idx: number, option: OptionType | null) => {
    ingredients[idx].ingredientId = option ? option.value : ''

    updateFields({ ingredients: ingredients })
  }

  const handleUpdateIngredientQty = (idx: number, qty: string) => {
    ingredients[idx].qty = qty as unknown as number

    updateFields({ ingredients: ingredients })
  }

  const handleUpdateIngredientMeasurement = (idx: number, measurement: OptionType | null) => {
    ingredients[idx].measurement = measurement ? measurement.value : ''

    updateFields({ ingredients: ingredients })
  }

  const handleAddIngredient = () => {
    ingredients.push({
      ingredientId: '',
      qty: 1,
      measurement: ''
    })

    updateFields({ ingredients: ingredients })
  }

  const handleDeleteIngredient = (idx: number) => {
    ingredients.splice(idx, 1)
    
    updateFields({ ingredients: ingredients })
  }

  return (
    <FormWrapper title='Ingredients'>
      <>
        {ingredients.map((ingr, idx) => (
          <div key={idx} className='w-full flex gap-2'>
            {ingredientList && (
              <Select className='basis-2/3'
                options={ingredientList} 
                onChange={(option) => handleUpdateIngredientId(idx, option)}
                value={ingredientList.find(option => option.value === ingr.ingredientId) || null} />
            )}
            <input className='basis-1/6'
              value={ingr.qty}
              onChange={(e) => handleUpdateIngredientQty(idx, e.target.value)}
              type='number' />
            <Select className='basis-1/4'
              options={measurementList}
              value={measurementList.find(meas => meas.value === ingr.measurement || null)}
              onChange={(option) => handleUpdateIngredientMeasurement(idx, option)} />
            {ingredients.length > 1 && (<button onClick={() => handleDeleteIngredient(idx)} type='button'>
              <FontAwesomeIcon icon={faTrash} />
            </button>)}
          </div>
        ))}
        <button type='button' onClick={handleAddIngredient}>+</button>
      </>
    </FormWrapper>
  )
}

export default FormIngredients