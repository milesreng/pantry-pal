const { parse } = require('csv-parse')
const { Ingredient } = require('../models/ingredient.model')

const fs = require('fs')

const path = 'db/ingredients.csv'

fs.createReadStream(path)
  .pipe(parse({ delimiter: ','}))
  .on('data', async (row) => {
    // console.log('data')
    const newIngr = new Ingredient({
      name: row[0]
    })

    await newIngr.save()
    return
  })
