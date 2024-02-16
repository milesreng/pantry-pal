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

const recipeSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  ingredients: [ingredientSchema]
}, { timestamps: true })

const Recipe = new mongoose.Model('Recipe', recipeSchema)

module.exports = Recipe