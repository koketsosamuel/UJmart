let Category = require("../models/Category")

module.exports = {


  addCategory: (req, res) => {

    let newCategory = new Category({
      name: req.body.name,
      icon: req.body.icon,
      expiration: req.body.expiration,
      expirationDays: req.body.expirationDays
    })
    
    newCategory.save(err => {
      if(err) {
        res.json({message: "Error adding category", error:true})
      } else {
        res.json({message: "Category added", error: false})
      }
    })

  },

  removeCategory: (req, res) => {


      Category.findOneAndRemove({_id: req.params.id}, (err) => {

        if(err) {
          res.json({message: err, error: true})
        } else {
          res.json({message: "Category has been removed", error:false})
        }

      })
    

  },

  updateCategory: (req, res) => {

    Category.findOneAndUpdate({_id: req.params.id},
      {
        name: req.body.name, 
        icon: req.body.icon,
        expiration: req.body.expiration,
        expirationDays: req.body.expirationDays
      }, (err) => {
      if(err) {
        res.json({message: err, error: true})
      } else {
        res.json({message: "Category has been updated", error:false})
      }
    })

  },

  getOne: (req, res) => {

    Category.findOne({_id: req.params.id}, (err, category) => {
      if(err) {
        res.json({message: err, error: true})
      } else {
        res.json({category, message: "Category fetch successful", error:false})
      }
    })

  },

  getAll: (req, res) => {
    Category.find({})
            .sort({name: 1})
            .exec((err, categories) => {
              if(err) {
                res.json({message: err, error: true})
              } else {
                res.json({categories: categories, message: "Categories fetched successfully", error:false})
              }
            })
    
  }


}