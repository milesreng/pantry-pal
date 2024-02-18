export interface Ingredient {
  _id: string,
  name: string
}

export interface RecipeIngredient {
  ingredientId: string,
  qty: number,
  measurement: string
}

export interface Recipe {
  title: string,
  description: string | null,
  servings: number,
  ingredients: RecipeIngredient[] | []
}