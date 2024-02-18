import React from 'react'
import Select from 'react-select'
import FormWrapper from '../FormWrapper'

import { OptionType } from '../../types/recipe.type'

type FormTagData = {
  tags: string[]
  tagList: OptionType[]
}

type FormTagProps = FormTagData & {
  updateFields: () => {}
}

const FormTags = ({ tags, tagList, updateFields }: FormTagProps) => {
  const addTag = (tag: OptionType) => {
    tags.push(tag)

    updateFields({tags: tags})
  }

  return (
    <FormWrapper title='Add Tags'>
      <Select
        isMulti
        options={tagList}
        value={() => {
          
        }} />
    </FormWrapper>
  )
}

export default FormTags