import authHeader from './auth-header'

class ExploreService {
  async getRecipes() {
    return await fetch('/api/recipes', {
      method: 'GET',
      headers: authHeader()
    })
  }

  async getIngredients() {
    return await fetch('/api/recipes/ingredients', {
      method: 'GET',
      headers: authHeader()
    })
  }

  async getTags() {
    return await fetch('/api/recipes/tags', {
      method: 'GET',
      headers: authHeader()
    })
  }

  async getRecipe(id: string) {
    return await fetch(`/api/recipes/${id}`, {
      method: 'GET',
      headers: authHeader()
    })
  }
}

export default new ExploreService()