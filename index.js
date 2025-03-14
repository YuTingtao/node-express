const express = require('express')
const app = express()

// 主机、端口号
const host = '127.0.0.1'
const port = 3000

// 静态文件
app.use(express.static('public'))

// 解析json格式
app.use(express.json())

// 解析urlencoded格式
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

// 路由
app.use(require('./routes/index.js'))

// 启动服务
app.listen(port, host, () => {
  console.log('Server is running at ' + host + ':' + port)
})