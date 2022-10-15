require('module-alias/register')
const express = require('express')
const app = express()
const cors = require('cors')
const { expressjwt } = require('express-jwt')
const config = require('./config')
const routes = require('./routes/index.js')

// 静态文件目录
app.use(express.static('./public'))

// 解析请求体JSON格式数据
app.use(express.json())

// 解析请求体urlencodeed格式数据
app.use(express.urlencoded({ extended: false }))

// cors解决跨域
app.use(cors())

app.all('*', (req, res, next) => {
    // 设置响应头
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
})

app.get('/', (req, res) => {
    res.send('Express Server!')
})

// res.cc中间件
app.use((req, res, next) => {
    res.cc = function(err, status = 0) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// jwt token
app.use(
    expressjwt({ secret: config.jwtSecret, algorithms: ['HS256'] })
        .unless({ path: ['/api/user/login', '/api/user/register'] })
)
// 使用路由
app.use('/api', routes)

// 错误中间件
app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        return res.cc('身份认证失败！')
    }
    res.cc(err.message, 500)
})

// 监听端口
const port = 80
app.listen(port, () => {
    console.log(`启动成功: http://127.0.0.1:${port}`)
})
