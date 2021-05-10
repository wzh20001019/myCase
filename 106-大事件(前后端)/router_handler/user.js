const db = require('../db/index.js')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('../config.js')

// 注册新用户
module.exports.reguser = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不能忘为空'
        })
    }

    let sql1 = 'select * from ev_users where username=?' //定义查询username 的sql语句
    let sql2 = 'insert into ev_users set ?' //定义插入数据的sql语句

    db.query(sql1, req.body.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }

        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用'
            })
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10)
        let data = {
            username: req.body.username,
            password: req.body.password
        }
        db.query(sql2, data, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册用户失败，请稍后再试！'
                })
            }
            res.send({
                status: 0,
                message: '注册成功！'
            })
        })
    })
}

//登录
module.exports.login = (req, res) => {
    let sql1 = 'select * from ev_users where username=?'
    db.query(sql1, req.body.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: '登陆失败'
            })
        }
        let flag = bcrypt.compareSync(req.body.password, results[0].password)

        if (!flag) {
            return res.send({
                status: 1,
                message: '登陆失败'
            })
        }

        let user = {...results[0], password: '' }
        let tokenStr = jwt.sign({ username: user.username }, config.secretKey, { expiresIn: '3h' })

        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        })
    })
}