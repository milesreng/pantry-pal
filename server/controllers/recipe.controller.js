const ObjectId = require('mongodb').ObjectId

const { Ingredient } = require('../models/ingredient.model')
const Recipe = require('../models/recipe.model')

const recipeController = {
  get_all_recipes: async (req, res) => {
    try {
      const recipes = await Recipe.find({})

      if (recipes) {
        return res.status(200).json(recipes)
      }
    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not retrieve recipes' })
    }
  },
  get_user_recipes: async (req, res) => {
    try {
      if (!req.userData.userId) return res.status(400).json({ message: 'invalid user id'})
      const recipes = await Recipe.find({ user_id: new ObjectId(req.userData.userId)})

      return res.status(200).json(recipes)
    } catch (e) {
      return res.status(404).json({ error: e.message, message: 'no recipes found' })
    }
  },
  create_recipe: async (req, res) => {
    try {
      const ingredients = []

      if (req.recipe.ingredients) {

        // assume list of Ingredient IDs
        for (let ingredient in req.recipe.ingredients) {
          let ingr = await Ingredient.findById(ingredient.id)

          if (ingr) ingredients.push({
            ingredient: ingr._id,
            quantity: ingredient.qty,
            measurement: ingredient.measurement
          })
        }
      }

      const newRecipe = new Recipe({
        user_id: req.userData.userId,
        title: req.recipe.title,
        servings: req.recipe.servings,
        ingredients
      })

      await newRecipe.save()

      return res.status(200).json({ message: 'successfully saved recipe', newRecipe })
      
    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not create recipe'})
    }
  },
  get_all_ingredients: async (req, res) => {
    
  },
  get_ingredients_by_category: async (req, res) => {

  },
  create_ingredient: async (req, res) => {
    try {
      const existIngr = await Ingredient.findOne({ name: req.ingredient.name })
      if (existIngr) return res.status(200).json({ message: 'ingredient already exists' })

      const newIngr = new Ingredient({
        name: req.ingredient.name
      })

      await newIngr.save()

      return res.status(200).json({ message: 'ingredient successfully created' })

    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not create ingredient' })
    }
  }
}

module.exports = recipeController