const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  type: {type: String, required: false},

})

module.exports = model('Statistic', schema)
