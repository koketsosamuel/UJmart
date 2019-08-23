const express = require('express')
const router = express.Router()
const Category = require('../controllers/Category')
const auth = require("../services/authenticate")

router.get('/one/:id', Category.getOne)
router.get('/all', Category.getAll)
router.put('/update/:id', Category.updateCategory)
router.post('/add', Category.addCategory)
router.delete('/remove/:id', Category.removeCategory)

module.exports = router