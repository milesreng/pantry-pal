/* eslint-disable react/react-in-jsx-scope */

import { useState, useEffect } from 'react'
import Select from 'react-select'
import { OptionType, RecipeIngredient, Ingredient } from '../../types/recipe.type'
import FormWrapper from '../FormWrapper'
import exploreService from '../../services/explore.service'
import userService from '../../services/user.service'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

type FormIngredientsData = {
  ingredients: RecipeIngredient[]
}

type FormIngredientsProps = FormIngredientsData & {
  updateFields: (fields: Partial<FormIngredientsData>) => void
}

const measurementList = [{
  label: 'cups',
  value: 'cups'
}, {
  label: 'tsp',
  value: 'tsp'
}, {
  label: 'tbsp',
  value: 'tbsp'
}, {
  label: 'oz',
  value: 'oz'
}, {
  label: 'lb',
  value: 'lb'
}, {
  label: 'package',
  value: 'package'
}, {
  label: 'unit',
  value: 'unit'
},]

const FormIngredients = ({ ingredients, updateFields }: FormIngredientsProps) => {
  const [showModal, setShowModal] = useState(false)
  const [ingredientList, setIngredientList] = useState<OptionType[] | null>()
  const [createIngredient, setCreateIngredient] = useState<string>('')
  const [ingredientError, setIngredientError] = useState<string | null>()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getIngredients()
  }, [])


  const getIngredients = async () => {
    console.log('set loading')
    setLoading(true)
    const response = await exploreService.getIngredients()
    const data: Ingredient[] = await response.json()
    const options: OptionType[] = data.map(ingredient => ({
      label: ingredient.name,
      value: ingredient._id
    }))

    setIngredientList(options)
    setLoading(false)
    console.log('set loading false')
  }

  const handleUpdateIngredientId = (idx: number, option: OptionType | null) => {
    ingredients[idx].ingredient = option ? option.value : ''

    updateFields({ ingredients: ingredients })
  }

  const handleUpdateIngredientQty = (idx: number, qty: string) => {
    ingredients[idx].qty = qty

    updateFields({ ingredients: ingredients })
  }

  const handleUpdateIngredientMeasurement = (idx: number, measurement: OptionType | null) => {
    ingredients[idx].measurement = measurement ? measurement.value : ''

    updateFields({ ingredients: ingredients })
  }

  const handleAddIngredient = () => {
    ingredients.push({
      ingredient: '',
      qty: '1',
      measurement: ''
    })

    updateFields({ ingredients: ingredients })
  }

  const handleDeleteIngredient = (idx: number) => {
    ingredients.splice(idx, 1)
    
    updateFields({ ingredients: ingredients })
  }

  const handleCreateIngredient = async () => {
    if (!ingredientList) return

    const exists = ingredientList.find((ingr) => ingr.label === createIngredient)

    if (exists) {
      setIngredientError('Ingredient already exists.')
      return
    }
    // check if ingredient already exists

    const response = await userService.createIngredient(createIngredient)

    if (response && response.ok) {
      setShowModal(false)
      setCreateIngredient('')
      await getIngredients()
    } else {
      setIngredientError('Could not create ingredient.')
    }
  }

  return (
    <FormWrapper title='Ingredients'>
      {loading ? (
        <div>
          Loading
        </div>
      ) : (
        <>
          {ingredients.map((ingr, idx) => (
            <div key={idx} className='w-full flex gap-2'>
              {ingredientList && (
                <Select className='basis-1/2'
                  options={ingredientList} 
                  required
                  onChange={(option) => handleUpdateIngredientId(idx, option)}
                  value={ingredientList.find(option => option.value === ingr.ingredient) || null} />
              )}
              <input className='w-1/6'
                value={ingr.qty}
                required
                onChange={(e) => handleUpdateIngredientQty(idx, e.target.value)}
                type='number' />
              <Select className='basis-1/4'
                options={measurementList}
                required
                value={measurementList.find(meas => meas.value === ingr.measurement || null)}
                onChange={(option) => handleUpdateIngredientMeasurement(idx, option)} />
              {ingredients.length > 1 && (<button onClick={() => handleDeleteIngredient(idx)} type='button'>
                <FontAwesomeIcon icon={faTrash} className='hover:text-[#c91c1c] duration-200 transition-all' />
              </button>)}
            </div>
          ))}
          <button type='button' onClick={handleAddIngredient}>
            <FontAwesomeIcon icon={faSquarePlus} className='text-2xl hover:text-[#32a850] duration-200 transition-all' />
          </button>
          <span>
            <span>Can&apos;t find an ingredient? </span>
            <button type='button' onClick={() => setShowModal(true)} className='underline'>Add it now.</button>
          </span> 
        </>)}
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Add New Ingredient
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input className='mx-auto w-full border-[1px] border-slate-500 bg-slate-100'
                    value={createIngredient}
                    onChange={(e) => setCreateIngredient(e.target.value)}
                    required
                    placeholder='e.g. carrot, oregano'
                    type="text" />
                  {ingredientError && (<span className='pt-8 text-red-600'>{ingredientError}</span>)}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Never mind
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCreateIngredient}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </FormWrapper>
  )
}

export default FormIngredients