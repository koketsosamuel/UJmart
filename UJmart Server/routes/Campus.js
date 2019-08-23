const express = require('express')
const router = express.Router()
const Campus = require('../controllers/Campus')
const auth = require("../services/authenticate")

router.get('/one/:id', Campus.getOne)
router.get('/all', Campus.getAll)
router.post('/add', Campus.addCampus)
router.delete('/remove/:id', Campus.removeCampus)
router.put('/update/:id', Campus.updateCampus)

module.exports = router