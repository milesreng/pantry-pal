import authHeader from './auth-header'
import { Recipe } from '../types/recipe.type'
import authService from './auth.service'

class UserService {
  async getUserContent() {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: authHeader()
    })

    if (response.ok) return response

    if (await authService.tryRefresh(response)) this.getUserContent()
  }

  async getUserRecipes() {
    const response = await fetch('/api/recipes/user', {
      method: 'GET',
      headers: authHeader()
    })

    if (response.ok) return response

    if (await authService.tryRefresh(response)) this.getUserRecipes()
  }

  async createRecipe(recipe: Recipe) {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(recipe)
    })

    if (response.ok) return response

    if (await authService.tryRefresh(response)) this.createRecipe(recipe)
  }

  async createIngredient(ingredient: string) {
    const response = await fetch('/api/recipes/ingredients', {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ingredient})
    })

    if (response.ok) return response

    if (await authService.tryRefresh(response)) this.createIngredient(ingredient)
  }
}

export default new UserService()