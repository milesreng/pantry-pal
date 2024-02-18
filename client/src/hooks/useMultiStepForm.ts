import { ReactElement, useState } from 'react'

export const useMultiStepForm = (steps: ReactElement[]) => {
  const [stepIdx, setStepIdx] = useState(0)

  const handleNext = () => {
    setStepIdx(stepIdx + 1)
  }

  const handlePrev = () => {
    setStepIdx(stepIdx - 1)
  }

  const handleGoTo = (idx: number) => {
    setStepIdx(idx)
  }

  return {
    steps,
    stepIdx,
    step: steps[stepIdx],
    handleNext,
    handlePrev,
    handleGoTo
  }
}