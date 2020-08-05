const {GetAllUsers} = require('../controllers/user.controllers')
const express = require('express')
const router = express.Router()

router.get('/users', GetAllUsers)

module.exports = router