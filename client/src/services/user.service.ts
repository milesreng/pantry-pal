import authHeader from './auth-header'
import { Recipe } from '../types/recipe.type'

class UserService {
  async getUserContent() {
    return await fetch('/api/users', {
      method: 'GET',
      headers: authHeader()
    })
  }

  async getUserRecipes() {
    return await fetch('/api/recipes/user', {
      method: 'GET',
      headers: authHeader()
    })
  }

  async createRecipe(recipe: Recipe) {
    return await fetch('/api/recipes', {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(recipe)
    })
  }

  async createIngredient(ingredient: string) {
    return await fetch('/api/recipes/ingredient', {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(ingredient)
    })
  }
}

export default new UserService()