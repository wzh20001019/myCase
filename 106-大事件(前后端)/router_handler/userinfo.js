const db = require('../db/index.js') //导入配置好的 mysql模块

const bcrypt = require('bcryptjs')

//获取用户信息
module.exports.getUserInfo = (req, res) => {
    let sql1 = `select id, username, nickname, email, user_pic from ev_users where username=?`
    db.query(sql1, req.user.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: '获取用户信息失败'
            })
        }
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
module.exports.updateUserInfo = (req, res) => {
    let sql1 = 'update ev_users set ? where username=?'
    db.query(sql1, [req.body, req.user.username], (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '更改信息失败'
            })
        }
        res.send({
            status: 0,
            message: '更改信息成功',
        })
    })
}

//重置密码
module.exports.updatePassword = (req, res) => {
    let sql1 = 'select * from ev_users where username=?'
    let sql2 = 'update ev_users set password=? where username=?'

    db.query(sql1, req.user.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: '用户不存在'
            })
        }

        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.send({
                status: 1,
                message: '原密码错误'
            })
        }

        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sql2, [newPwd, req.user.username], (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '更新密码失败'
                })
            }
            res.send({
                status: 0,
                message: '密码已更新'
            })
        })
    })
}

// 更新用户头像的处理函数
module.exports.updateAvatar = (req, res) => {
    let sql1 = 'update ev_users set user_pic=? where username=?'
    db.query(sql1, [req.body.avatar, req.user.username], (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '更新图像失败'
            })
        }
        res.send({
            status: 0,
            message: '更新图像成功'
        })
    })
}