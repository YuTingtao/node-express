const express = require('express')
const router = express.Router()

router.get('/userInfo', (req, res) => {
  res.json({
    code: 200,
    msg: '查询成功',
    data: {
      name: '张三',
      age: 18
    }
  })
})

module.exports = router