const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const recipeController = require('../controllers/recipe.controller')

// @route   GET api/recipes/ingredients
// @desc    Get all ingredients
// @status  --
router.get('/ingredients', recipeController.get_all_ingredients)

// @route   GET api/recipes/ingredients/:category
// @desc    Get ingredients by category
// @status  --
router.get('/ingredients/:category', recipeController.get_ingredients_by_category)

// @route   POST api/recipes/ingredients
// @desc    Create new ingredient
// @status  --
router.post('/ingredients', checkAuth, recipeController.create_ingredient)

// @route   GET api/recipes/tags
// @desc    Get all recipe tags
// @status  --
router.get('/tags', recipeController.get_all_tags)

// @route   POST api/recipes/tags
// @desc    Create new tag
// @status  --
router.post('/tags', recipeController.create_tag)

// @route   GET api/recipes/user
// @desc    Get user recipes
// @status  --
router.get('/user', checkAuth, recipeController.get_user_recipes)

// @route   DELETE api/recipes/:id
// @desc    Delete recipe
// @status  --
router.delete('/:id', checkAuth, recipeController.delete_recipe)

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @status  --
router.get('/:id', recipeController.get_recipe_by_id)


// @route   GET api/recipes/
// @desc    Get all recipes
// @status  --
router.get('/', recipeController.get_all_recipes)

// @route   POST api/recipes/
// @desc    Create new recipe
// @status  --
router.post('/', checkAuth, recipeController.create_recipe)

module.exports = router