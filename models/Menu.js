const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  type: {type: String, required: false},
  weight: { type: Number, required: false},
  structure: {type: String, required: false},
  photo: {type: String, required: false}

})

module.exports = model('Menu', schema)
