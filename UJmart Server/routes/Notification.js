const express = require('express')
const router = express.Router()
const Notification = require('../controllers/Notification')
const auth = require("../services/authenticate")

router.get('/one/:id', Notification.getOne)
router.get('/all', Notification.getAll)
router.post('/add', Notification.addNotification)
router.put('/update/:id', Notification.updateNotification)
router.delete('/remove/:id', Notification.removeNotification)

module.exports = router