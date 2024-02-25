/* eslint-disable react/react-in-jsx-scope */
import FormWrapper from '../FormWrapper'

type FormDetailsData = {
  title: string,
  servings: number,
  description: string | null
}

type FormDetailsProps = FormDetailsData & {
  updateFields: (fields: Partial<FormDetailsData>) => void
}

const FormDetails = ({ title, servings, description, updateFields }: FormDetailsProps) => {
  return (
    <FormWrapper title='Recipe Details'>
      <div className='flex justify-between w-full'>
        <label className='w-1/4' htmlFor='title'>Name</label>
        <input className='w-3/4'
          name='title' 
          type='text'
          value={title}
          onChange={(e) => updateFields({ title: e.target.value })}
          required />
      </div>
      <div className='flex justify-between w-full'>
        <label className='w-1/4' htmlFor='servings'>Servings</label>
        <input className='w-3/4'
          name='servings' 
          type='number'
          value={servings}
          onChange={(e) => updateFields({ servings: e.target.value as unknown as number })}
          required />
      </div>
      <div className='flex justify-between w-full'>
        <label className='w-1/4' htmlFor='description'>Description</label>
        <textarea className='w-3/4'
          name='description'
          value={description || ''}
          onChange={(e) => updateFields({ description: e.target.value })} />
      </div>
      <div className='flex justify-between w-full'>
        <label className='w-1/4' htmlFor='description'>Description</label>
      </div>
    </FormWrapper>
  )
}

export default FormDetails