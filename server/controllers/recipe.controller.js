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
      if (!req.params.uid) return res.status(400).json({ message: 'invalid user id'})

      console.log('trying to get recipes')

      const recipes = await Recipe.find({ user_id: req.params.uid })

      return res.status(200).json(recipes)
    } catch (e) {
      return res.status(404).json({ error: e.message, message: 'no recipes found' })
    }
  },
  get_recipe_by_id: async (req, res) => {
    try {
      console.log('attempting to retrieve recipe')
      const recipe = await Recipe.findById(req.params.id)

      if (!recipe) return res.status(404).json({ error: e.message, message: 'no recipe found' })

      if (recipe.public) return res.status(200).json(recipe)

      const token = req.headers['authorization'].split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

      if (recipe.user_id === decodedToken.userId) return res.status(200).json(recipe)

      return res.status(400).json({ error: e.message, message: 'user not authorized to access recipe' })

    } catch (e) {
      return res.status(404).json({ error: e.message, message: 'no recipe found' })
    }
  },
  create_recipe: async (req, res) => {
    try {
      const recipe = req.body
      console.log(recipe)
      const ingredients = []
      const tags = []

      if (recipe.ingredients.length == 0) return res.status(400).json({ error: 'must have at least one ingredient' })

      // assume list of Ingredient IDs
      for (let idx in recipe.ingredients) {
        // console.log(`finding ingredient w/ id ${JSON.stringify(ingredient)}`)
        const ingredient = recipe.ingredients[idx]
        let ingr = await Ingredient.findById(ingredient.ingredientId)

        if (ingr) {
          ingredients.push({
            ingredient: ingr._id,
            quantity: ingredient.qty,
            measurement: ingredient.measurement
          })
        } else {
          return res.status(400).json({ error: 'attempted to add undefined ingredient' })
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
        steps: recipe.steps,
        ingredients,
        tags,
        public: recipe.public ? recipe.public : false
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