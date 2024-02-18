import React from 'react'
import Select from 'react-select'
import { OptionType } from '../../types/recipe.type'
import FormWrapper from '../FormWrapper'

const FormIngredients = () => {
  return (
    <FormWrapper title='Ingredients'>
      <input />
      {/* {ingredients && <Select options={ingredients} />} */}
    </FormWrapper>
  )
}

export default FormIngredients