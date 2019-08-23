const mongoose = require('mongoose')

// SCHEMA
let campusSchema = new mongoose.Schema({
  
  name : {
    type: String,
    unique: true,
    required: true
  }


})

//MODEL
let Campus = mongoose.model('model', campusSchema)

//EXPORT
module.exports = Campus