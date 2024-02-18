const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const recipeTagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  }
})

const RecipeTag = new mongoose.model('RecipeTag', recipeTagSchema)

module.exports = { recipeTagSchema, RecipeTag }