const express = require('express')
const router = express.Router()
const user = require('./user/index.js')

// 中间件
router.use((req, res, next) => {
    next()
})

router.use('/user', user)

module.exports = router
