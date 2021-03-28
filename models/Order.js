const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  dishes: {type: String, required: true},
  sum: {type: Number, required: false},
  owner: {type: Types.ObjectId, ref: 'User'},
  state: {type: String, required: false},
  date: { type: Date, required: false },
  name: {type: String, required: true}

})

module.exports = model('Order', schema)
