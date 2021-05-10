const express = require('express')
const app = express()

const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))


const secretKey = 'wzhGah kju'

app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))


app.post('/api/post', (req, res) => {
    if (req.body.username !== 'wzh' || req.body.password !== '000000') {
        return res.send({
            status: 1,
            message: '登陆失败'
        })
    }

    const tokenStr = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '60s' })

    res.send({
        status: 0,
        message: '登陆成功',
        token: tokenStr
    })
})

app.get('/code/get', (req, res) => {
    console.log(req.user)
    res.send({
        status: 0,
        data: req.user
    })
})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效token'
        })
    }
    res.send({
        status: 500,
        message: '未知错误'
    })
})

app.listen(80, () => {
    console.log('Express server running at http://127.0.0.1')
})