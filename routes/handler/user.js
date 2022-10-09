const db = require('@/db/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('@/config.js')

// 注册处理函数
exports.register = (req, res) => {
    const { body } = req
    if (!body.username || !body.password) {
        return res.cc('用户名或密码不能为空！')
    }
    // 查询用户名是否被占用
    const sql = 'select * from users where username=?'
    db.query(sql, body.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名已存在！')
        }
        // 密码加密
        body.password = bcrypt.hashSync(body.password, 10)
        const sql = 'insert into users set ?'
        const user = {
            username: body.username,
            password: body.password
        }
        db.query(sql, user, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            res.cc('注册成功！', 200)
        })
    })
}

// 登录处理函数
exports.login = (req, res) => {
    const { body } = req
    if (!body.username || !body.password) {
        return res.cc('用户名或密码不能为空！')
    }
    const sql = 'select * from users where username=?'
    db.query(sql, body.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 0) {
            return res.cc('用户不存在！')
        }
        const compare = bcrypt.compareSync(body.password, results[0].password)
        if (!compare) {
            return res.cc('用户名或密码不正确')
        }
        const { password, ...userInfo } = results[0]
        const token = jwt.sign(
            { id: userInfo.id },
            config.jwtSecret,
            { expiresIn: config.expires }
        )
        res.send({
            status: 200,
            message: '请求成功！',
            data: {
                token,
                userInfo
            }
        })
    })
}