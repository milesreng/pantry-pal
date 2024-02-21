/* eslint-disable react/react-in-jsx-scope */
import FormWrapper from '../FormWrapper'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

type FormStepsData = {
  steps: string[]
}

type FormStepsProps = FormStepsData & {
  updateFields: (fields: Partial<FormStepsData>) => void
}

const FormSteps = ({ steps, updateFields }: FormStepsProps) => {
  const handleUpdateStep = (idx: number, data: string) => {
    steps[idx] = data
    updateFields({steps: steps})
  }

  const handleDeleteStep = (idx: number) => {
    if (steps.length > 1) {
      steps.splice(idx, 1)
      updateFields({steps: steps})
    }
  }

  const handleAddStep = () => {
    steps.push('')
    updateFields({steps: steps})
  }

  return (
    <FormWrapper title='Cooking Instructions'>
      {steps && steps.map((step, idx) => (
        <div key={idx} className='w-full flex gap-2'>
          <p className='w-1/6'>{idx + 1}.</p>
          <textarea className='w-5/6'
            required
            onChange={(e) => handleUpdateStep(idx, e.target.value)}
            value={step} />
          {steps.length > 1 && (<button type='button' onClick={() => handleDeleteStep(idx)}>
            <FontAwesomeIcon icon={faTrash} className='hover:text-[#c91c1c] duration-200 transition-all' />
          </button>)}
        </div>
      ))}
      <button type='button' onClick={handleAddStep}>
        <FontAwesomeIcon icon={faSquarePlus} className='text-2xl hover:text-[#32a850] duration-200 transition-all' />
      </button>
    </FormWrapper>
  )
}

export default FormSteps