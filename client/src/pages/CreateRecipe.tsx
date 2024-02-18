import React from 'react'
import CreateRecipeForm from '../components/CreateRecipeForm'

const CreateRecipe = () => {
  

  return (
    <div className='w-full min-h-screen mt-[-2.5rem] flex flex-col align-middle justify-center'>
      <div className='w-11/12 md:w-1/2 my-4 mx-auto flex flex-col justify-center bg-slate-200 py-4 px-12 rounded-md'>
        {/* <p className='font-bold text-xl text-center py-4'>Create Recipe</p> */}
        <CreateRecipeForm />
      </div>
    </div>
  )
}

export default CreateRecipe