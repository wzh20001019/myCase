const express = require('express')

const app = express()

const session = require('express-session')

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    })
)

app.use(express.static('./code'));
app.use(express.urlencoded({ extended: false }))

app.post('/api/login', (req, res) => {
    if (req.body.username !== 'wzh' || req.body.password !== '000000') {
        return res.send({
            status: 1,
            message: '登录失败',
        })
    }

    req.session.user = req.body;
    req.session.login = true;

    res.send({
        status: 0,
        message: '登录成功'
    })
})

app.get('/api/username', (req, res) => {
    if (!req.session.login) {
        return res.send({
            status: 1,
            message: 'fail'
        })
    }

    res.send({
        status: 0,
        message: 'success',
        username: req.session.user.username
    })
})

app.post('/api/off', (req, res) => {
    req.session.destroy()
    res.send({
        status: 0,
        message: '退出登陆成功',
    })
})

app.listen(80, () => {
    console.log('Express server running at http://127.0.0.1')
})