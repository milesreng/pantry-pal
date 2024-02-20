/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Select, { MultiValue } from 'react-select'
import FormWrapper from '../FormWrapper'
import exploreService from '../../services/explore.service'

import { OptionType, Tag } from '../../types/recipe.type'

type FormTagData = {
  tags: string[]
}

type FormTagProps = FormTagData & {
  updateFields: (fields: Partial<FormTagData>) => void
}

const FormTags = ({ tags, updateFields }: FormTagProps) => {
  const [tagList, setTagList] = useState<OptionType[]>([])
  const [selectedTags, setSelectedTags] = useState<OptionType[]>([])

  useEffect(() => {
    const getTags = async () => {
      const response = await exploreService.getTags()
      const data: Tag[] = await response.json()
      const options: OptionType[] = data.map(tag => ({
        label: tag.label,
        value: tag._id
      }))

      setTagList(options)
    }

    getTags()
    setSelectedTags(tagList.filter((tag) => tags.includes(tag.value)))
  }, [])

  useEffect(() => {
    setSelectedTags(tagList.filter((tag) => tags.includes(tag.value)))
  }, [tags])

  const handleUpdateTags = (selectedOptions: MultiValue<OptionType>) => {
    const newTags = selectedOptions.map((tag) => tag.value)
    updateFields({ tags: newTags })
  }

  return (
    <FormWrapper title='Add Tags'>
      {tagList && (<Select
        isMulti
        onChange={handleUpdateTags}
        value={selectedTags}
        options={tagList} />)}
    </FormWrapper>
  )
}

export default FormTags