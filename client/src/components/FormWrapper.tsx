/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from 'react'

type FormWrapperProps = {
  title: string,
  children: ReactNode
}

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <p className='text-center text-xl font-bold'>{title}</p>
      {children}
    </>
  )
}

export default FormWrapper