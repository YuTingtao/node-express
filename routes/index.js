const express = require('express')
const router = express.Router()

// 用户模块
const userRoutes = require('./user/index.js')
router.use('/user', userRoutes)

module.exports = router