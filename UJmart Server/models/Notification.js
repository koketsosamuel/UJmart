const mongoose = require("mongoose")

let notificationSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  shortDesc: {
    type: String,
    required: true
  },

  notification: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  }

})

let Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification