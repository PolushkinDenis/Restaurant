const {Schema, model, Types} = require('mongoose')

// const schema = new Schema({
//   email: {type: String, required: true, unique: true},
//   password: {type: String, required: true},
//   isAdmin: {type: String, required: true},
//   links: [{ type: Types.ObjectId, ref: 'Link' }]
// })
const schema = new Schema({
  name: {type: String, required: true},
  login: {type: String, required: true, unique: true},
  tel: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {type: String, required: true},
  surname: {type: String, required: false},

})

module.exports = model('User', schema)
