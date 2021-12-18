var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/list', (req, res, next) => {
    res.json({
        status: 200,
        data: [
            { name: '张三', sex: '男' },
            { name: '李四', sex: '女' },
            { name: '王二', sex: '男' },
            { name: '老五', sex: '男' }
        ]
    });
});

module.exports = router;
