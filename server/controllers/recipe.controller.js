const ObjectId = require('mongodb').ObjectId

const { Ingredient } = require('../models/ingredient.model')
const { RecipeTag } = require('../models/tag.model')
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
      const recipe = req.body
      const ingredients = []
      const tags = []

      if (recipe.ingredients) {

        // assume list of Ingredient IDs
        for (let ingredient in recipe.ingredients) {
          let ingr = await Ingredient.findById(ingredient.id)

          if (ingr) ingredients.push({
            ingredient: ingr._id,
            quantity: ingredient.qty,
            measurement: ingredient.measurement
          })
        }
      }

      if (recipe.tags) {
        for (let tag in recipe.tags) {
          let existTag = await RecipeTag.findOne({ label: tag })

          tags.push(existTag)
        }
      }

      const newRecipe = new Recipe({
        user_id: req.userData.userId,
        title: recipe.title,
        servings: recipe.servings,
        ingredients,
        tags
      })

      await newRecipe.save()

      return res.status(200).json({ message: 'successfully saved recipe', newRecipe })
      
    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not create recipe'})
    }
  },
  get_all_ingredients: async (req, res) => {
    try {
      const ingredients = await Ingredient.find({})

      return res.status(200).json(ingredients)
    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not fetch ingredients'})
    }
  },
  get_ingredients_by_category: async (req, res) => {

  },
  create_ingredient: async (req, res) => {
    try {
      const ingredient = req.body

      const existIngr = await Ingredient.findOne({ name: ingredient.name })
      if (existIngr) return res.status(200).json({ message: 'ingredient already exists' })

      const newIngr = new Ingredient({
        name: ingredient.name
      })

      await newIngr.save()

      return res.status(200).json({ message: 'ingredient successfully created' })

    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not create ingredient' })
    }
  },
  get_all_tags: async (req, res) => {
    try {
      const tags = await RecipeTag.find({})

      return res.status(200).json(tags)
    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not get tags' })
    }
  },
  create_tag: async (req, res) => {
    try {
      console.log(req.body.tag)
      const existTag = await RecipeTag.findOne({ label: req.body.tag })
      if (existTag) return res.status(400).json({ message: 'tag already exists' })

      const newTag = new RecipeTag({
        label: req.body.tag
      })

      await newTag.save()

      return res.status(200).json(newTag)
    } catch (e) {
      return res.status(400).json({ error: e.message, message: 'could not create tag' })
    }
  }
}

module.exports = recipeController