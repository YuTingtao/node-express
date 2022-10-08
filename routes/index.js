const express = require('express')
const router = express.Router()
const userRoutes = require('./modules/user.js')

// 中间件
// router.use((req, res, next) => {
//     next()
// })

router.use('/user', userRoutes)

module.exports = router
