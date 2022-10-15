const express = require('express')
const router = express.Router()
const handler = require('../handler/user.js')

// 注册
router.post('/register', handler.register)

// 登录
router.post('/login', handler.login)

module.exports = router
