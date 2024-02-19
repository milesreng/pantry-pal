export interface Ingredient {
  _id: string,
  name: string
}

export interface Tag {
  _id: string,
  label: string
}

export interface RecipeIngredient {
  ingredientId: string,
  qty: number,
  measurement: string
}

export interface Recipe {
  _id: string | null,
  title: string,
  description: string | null,
  servings: number,
  ingredients: RecipeIngredient[] | [],
  steps: string[],
  tags: string[],
  public: boolean
}

export interface OptionType {
  label: string,
  value: string
}