const mongoose = require('mongoose')
const Schema = mongoose.Schema

let favouriteSchema = new Schema({
  label: String,
  image: String,
  ingredientLines: [String],
  calories: Number,
  totalTime: Number
}, {
  timestamps: true
})

const favourite = mongoose.model('Favourite', favouriteSchema)
module.exports = favourite