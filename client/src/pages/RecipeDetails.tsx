/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import userService from '../services/user.service'
import exploreService from '../services/explore.service'
import { RecipeDetailsType } from '../types/recipe.type'

import LoadingIndicator from '../components/LoadingIndicator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const RecipeDetails = () => {
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState<RecipeDetailsType | null>()
  const [isCreator, setIsCreator] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    fetchRecipe()
  }, [])

  const fetchRecipe = async () => {
    setLoading(true)
    const response = await exploreService.getRecipe(id as string)
    const data = await response.json()

    if (response.ok) {
      setRecipe(data)

      if (localStorage.getItem('userId') === data.user_id) {
        setIsCreator(true)
      } else {
        setIsCreator(false)
      }
    } else {
      setRecipe(null)
    }

    setLoading(false)
  }

  const addRecipeStep = () => {
    if (recipe) {
      const currSteps = recipe.steps
      currSteps.push('')
      console.log(currSteps)

      setRecipe({ ...recipe, steps: currSteps })
    }
  }

  const handleDelete = async () => {
    if (recipe) {
      const response = await userService.deleteRecipe(recipe._id)

      if (response.ok) navigate('/')
    }
  }

  return (
    <div className='min-h-screen'>
      { recipe ? (
        <div className='w-5/6 mx-auto py-8 flex flex-col'>
          <div className='flex gap-4'>
            <p className='text-2xl font-bold'>
              { recipe.title }
            </p>
            { isCreator && 
              showEdit ? (
                <span className='my-auto pt-1 underline text-sm' onClick={() => setShowEdit(false)}>done editing</span>
              ) : (
                <>
                  <span className='my-auto pt-1 underline text-sm' onClick={() => setShowEdit(true)}>edit recipe</span>
                  <span>
                    <button className=''
                      onClick={() => setShowConfirmDelete(true)}
                      type='button'>
                      <FontAwesomeIcon icon={faTrash} />
                    </button> 
                  </span>
                </>
              )
            }
          </div>  
          {(isCreator && showEdit) ? (
            <>
              <div className='flex gap-2'>
                <p className='my-auto'>Serves </p><input type="number" className='w-1/6' />
              </div>
              <div className='w-5/6 sm:w-2/3 md:w-1/3 aspect-square my-4 bg-slate-300 flex justify-center align-middle'>
                <span className='text-center w-full my-auto'>Image upload</span>
              </div>
              <div>
                <p className='text-lg'>Ingredients</p>
                {recipe.ingredients.map((ingr, idx) => (
                  <div key={idx} className='flex gap-4 py-2'>
                    <span className='font-bold'>{ingr.quantity} {ingr.measurement}</span>
                    <span>{ingr.name}</span>
                  </div>
                ))}
              </div>
              <p className='text-lg'>Cooking Instructions</p>
              <div className='py-2 flex flex-col gap-4'>
                { recipe.steps.map((step, idx) => (
                  <div key={idx} className='gap-2 flex w-full'>
                    <span className='basis-1/2 flex gap-4'>
                      {idx + 1}. 
                      <span className='basis-2/3'>
                        <input className='basis-2/3' type='text' value={step} />
                      </span>
                      { (idx !== recipe.steps.length - 1) && (
                        <>
                          <FontAwesomeIcon icon={faTrash} />
                        </>
                      )}

                    </span>
                    <span className='basis-1/12 my-auto'>
                      { (idx == recipe.steps.length - 1) && (
                        <FontAwesomeIcon icon={faSquarePlus} onClick={addRecipeStep} />
                      ) }
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className='mb-2'>Serves {recipe.servings}</p>
              <div className='flex gap-4'>
                <div className='basis-1/2 flex flex-col gap-2'>
                  <div className='w-96 h-96 bg-slate-300 flex justify-center align-middle'>
                    <span className='text-center w-full my-auto'>Image here</span>
                  </div>
                  <p>
                    { recipe.description }
                  </p>
                </div>
                <div>
                  <p className='text-xl'>Ingredients</p>
                  {recipe.ingredients.map((ingr, idx) => (
                    <div key={idx} className='flex gap-4 py-1'>
                      <span className='font-bold'>{ingr.quantity} {ingr.measurement}</span>
                      <span>{ingr.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='my-4 flex flex-col gap-4'>
                <p className='text-xl'>Steps</p>
                { recipe.steps.map((step, idx) => (
                  <div key={idx}>
                    {idx + 1}. { step }
                  </div>
                ))}
              </div>
            </>
          )}
          {showConfirmDelete && (
            <>
              <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog font-content">
                <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                  <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                  <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                    <div className="md:flex items-center">
                      <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                        <i className="bx bx-error text-3xl font-sans">
                          &#9888;
                        </i>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="font-bold">Warning!</p>
                        <p className="text-sm text-gray-700 mt-1">This action cannot be undone.
                        </p>
                      </div>
                    </div>
                    <div className="text-center md:text-right md:flex md:justify-end">
                      <button id="confirm-delete-btn" onClick={handleDelete} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                              Delete
                      </button>
                      <button type='button' onClick={() => setShowConfirmDelete(false)} id="confirm-cancel-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                          Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          Could not retrieve recipe
        </div>
      ))}
    </div>
  )
}

export default RecipeDetails