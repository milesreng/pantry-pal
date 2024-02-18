const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const { recipeIngredientSchema } = require('./ingredient.model')
const { recipeTagSchema } = require('./tag.model')

const recipeSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  ingredients: [recipeIngredientSchema],
  public: {
    type: Boolean,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecipeTag'
  }]
}, { timestamps: true })

const Recipe = new mongoose.model('Recipe', recipeSchema)

module.exports = Recipe