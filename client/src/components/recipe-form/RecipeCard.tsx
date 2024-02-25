/* eslint-disable react/react-in-jsx-scope */
import { RecipeDetailsType } from '../../types/recipe.type'

type recipeCardProps = {
  recipe: RecipeDetailsType
}

const RecipeCard = ({ recipe }: recipeCardProps) => {
  return (
    <div className='w-full h-full'>
      <div className='bg-slate-200 w-full h-5/6 text-center'>
        <span className='text-xs mx-auto my-12'>
          Image here
        </span>
        {/* <img src="" alt="" /> */}
      </div>
      <div className='h-1/6 w-full bg-slate-700 text-white p-1 text-sm'>
        { recipe.title }
      </div>
    </div>
  )
}

export default RecipeCard