const Ad = require("../models/Ad")
const Campus = require("../models/Campus")
const User = require("../models/User")
const Category = require("../models/Category")

let totals = {
  ads: null,
  campuses: null,
  categories: null,
  users: null
}

module.exports = async (req, res) => {

  await Ad.estimatedDocumentCount((err, count) => {
    totals.ads = count
  })

  await Campus.countDocuments((err, count) => {
    totals.campuses = count
  })

  await User.estimatedDocumentCount((err, count) => {
    totals.users = count
  })

  await Category.countDocuments((err, count) => {
    totals.categories = count
  })
  
  res.json(totals)

}