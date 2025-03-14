const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

// 用户列表 mock数据
const userList = Mock.mock({
  'array|10': [{
    id: '@id',
    name: '@cname',
    age: '@integer(20, 50)',
    date: '@date(yyyy-MM-dd HH:mm:ss)',
    address: '@city(true)',
    email: '@email',
    desc: '@cword(40, 50)',
    status: '@integer(0, 1)',
    avatar: '@image(200x200, @color, avatar)',
  }]
})
// 用户列表
router.get('/userList', (req, res) => {
  res.json({
    code: 200,
    msg: '查询成功',
    data: {
      list: userList,
      total: userList.length * 10,
      pageNum: 1,
      pageSize: 10,
    }
  })
})

module.exports = router