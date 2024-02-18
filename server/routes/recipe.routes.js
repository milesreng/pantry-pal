const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const recipeController = require('../controllers/recipe.controller')

// @route   GET api/recipes/
// @desc    Get all recipes
// @status  --
router.get('/', recipeController.get_all_recipes)

// @route   GET api/recipes/user
// @desc    Get user recipes
// @status  --
router.get('/', checkAuth, recipeController.get_user_recipes)

// @route   POST api/recipes/
// @desc    Create new recipe
// @status  --
router.post('/', checkAuth, recipeController.create_recipe)

// @route   GET api/recipes/ingredients
// @desc    Get all ingredients
// @status  --
router.get('/ingredients', recipeController.get_all_ingredients)

// @route   GET api/recipes/ingredients/:category
// @desc    Get all ingredients
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

module.exports = router