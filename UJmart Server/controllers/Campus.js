let Campus = require('../models/Campus')

module.exports = {

  addCampus: (req, res) => {
    
    let newCampus = new Campus({
      name: req.body.name
    })

    newCampus.save(err => {
      if(err) {
        res.json({message: "Error adding campus", error: true})
      } else {
        res.json({message: "Campus added successfully", error: false})
      }
    })

  },

  removeCampus: (req, res) => {

    Campus.findByIdAndDelete(req.params.id, (err, campus) => {
      
      if(err) {
        res.json({message: `Error removing ${campus.name}`, error: true})
      } else {
        res.json({message: `${campus.name} has been removed`, error: false})
      }

    })

  },


  getAll: (req, res) => {

    Campus.find({})
          .sort({name: 1})
          .exec((err,campuses) => {
      
            if(err) {
              res.json({message: 'Error fetching campuses', error: true})
            } else {
              res.json({message: 'fetch campuses successful', campuses, error: false})
            }

          })

  },

  getOne: (req, res) => {

    Campus.findOne({_id: req.params.id}, (err, campus) => {
      if(err) {
        res.json({message: `Error fetching campus`, error: true})
      } else {
        res.json({message: `campus fetched successfully`, campus, error: false})
      }
    })

  },
  

  updateCampus: (req, res) => {

    Campus.findOneAndUpdate({_id: req.params.id}, {name: req.body.name}, (err, campus) => {
      if(err) {
        res.json({message: `Error updating ${campus.name}`, error: true})
      } else {
        res.json({message: `Campus updated successfully`, error: false})
      }
    })

  }

}