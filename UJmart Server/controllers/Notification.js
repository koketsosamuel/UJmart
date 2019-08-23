let Notification = require("../models/Notification")

module.exports = {


  addNotification: (req, res) => {

    let newNotification = new Notification({

      title: req.body.title,
      shortDesc: req.body.shortDesc,
      notification: req.body.notification

    })

    newNotification.save(err => {
      
      if(err) {
        res.json({message: "Error making notification", error: true})
      } else {
        res.json({message: "Notification successfully made", error: false})
      }

    })

  },

  removeNotification: (req, res) => {

    Notification.findByIdAndDelete(req.params.id, (err) => {
      
      if(err) {
        res.json({message: `Error removing notification`, error: true})
      } else {
        res.json({message: `notification has been removed`, error: false})
      }

    })

  },


  getAll: (req, res) => {

    Notification.find({})
                .sort({created: -1}) 
                .exec((err, notifications) => {
                  if(err) {
                    res.json({message: 'Error fetching notifications', error: true})
                  } else {
                    res.json({message: 'fetch notifications successful', notifications, error: false})
                  }
                })

  },

  getOne: (req, res) => {

    Notification.findOne({_id: req.params.id}, (err, notification) => {
      if(err) {
        res.json({message: `Error fetching notification`, error: true})
      } else {
        res.json({message: `notification fetched successfully`, notification, error: false})
      }
    })

  },
  

  updateNotification: (req, res) => {

    let updateValues = {
      title: req.body.title,
      shortDesc: req.body.shortDesc,
      notification: req.body.notification
    }

    Notification.findOneAndUpdate({_id: req.params.id}, updateValues, (err) => {
      if(err) {
        res.json({message: `Error updating notification`, error: true})
      } else {
        res.json({message: `Notification updated successfully`, error: false})
      }
    })

  }


}