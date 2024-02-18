const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  }
})

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  measurement: {
    type: String,
    required: true
  }
})

const Ingredient = new mongoose.model('Ingredient', ingredientSchema)

module.exports = { Ingredient, recipeIngredientSchema }