const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  photo: {type: String, required: false},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Cart', schema)
