export interface Ingredient {
  _id: string,
  name: string
}

export interface Tag {
  _id: string,
  label: string
}

export interface RecipeIngredient {
  ingredient: string,
  qty: string,
  measurement: string
}

export interface RecipeIngredientDetails {
  ingredient: string,
  name: string,
  quantity: number,
  measurement: string
}

export interface Recipe {
  title: string,
  description: string | null,
  servings: number,
  ingredients: RecipeIngredient[] | [],
  steps: string[],
  tags: string[],
  public: boolean
}

export interface RecipeDetailsType {
  _id: string,
  title: string,
  description: string | null,
  servings: number,
  ingredients: RecipeIngredientDetails[] | [],
  steps: string[],
  tags: string[],
  public: boolean
}

export interface OptionType {
  label: string,
  value: string
}