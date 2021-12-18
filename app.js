var express = require('express');
var app = express();
var port = 3000;
var routes = require('./routes/index.js');

// 设置静态文件目录
app.use(express.static('public'));

// 设置响应头
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'token');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 使用路由
app.use('/', routes);

// 监听端口
app.listen(port, () => {
    console.log(`服务启动成功: http://localhost:${port}`);
});
