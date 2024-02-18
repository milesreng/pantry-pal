import authHeader from './auth-header'

class ExploreService {
  async getIngredients() {
    return await fetch('/api/recipes/ingredients', {
      method: 'GET',
      headers: authHeader()
    })
  }
}

export default new ExploreService()