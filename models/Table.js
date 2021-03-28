const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: Number, required: true, unique: true},
  seat: {type: Number, required: true},
  booked: {type: Boolean, required: false},
  data: {type: Date, required: false},
  photo: {type: String, required: false}

})

module.exports = model('Table', schema)
