import React from 'react'
import CreateRecipeForm from '../components/CreateRecipeForm'

const CreateRecipe = () => {
  

  return (
    <div className='w-full min-h-screen mt-[-2.5rem] flex flex-col align-middle justify-center'>
        {/* <p className='font-bold text-xl text-center py-4'>Create Recipe</p> */}
        <CreateRecipeForm />
    </div>
  )
}

export default CreateRecipe