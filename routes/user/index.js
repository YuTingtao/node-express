const express = require('express')
const router = express.Router()

// 中间件
router.use((req, res, next) => {
    next()
})

router.get('/info', (req, res, next) => {
    const { query } = req
    res.send({
        status: 200,
        msg: '请求成功！',
        data: { name: '张三', gender: '男', ...query },
    })
})

module.exports = router
