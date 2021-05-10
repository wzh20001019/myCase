const express = require('express') //导入express模块

const joi = require('@hapi/joi')

const app = express() //创建web服务器

const cors = require('cors') //导入cors模块  解决跨域问题
app.use(cors()) //注册到全局

app.use(express.static('./uploads')) // 托管静态资源文件
app.use(express.json()) //解析json格式的数据
app.use(express.urlencoded({ extended: false })) //解析 URL-encoded 表单格式的数据

const expressJWT = require('express-jwt') //导入解析 token 的模块
const config = require('./config.js') //导入自己配置的 加密 解析 的token密钥

app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api/] }))

const userRouter = require('./router/user.js') //导入 注册 登录 的路由模块
app.use('/api', userRouter)

const userInfoRouter = require('./router/userinfo.js') //导入个人中心的 路由模块
app.use('/my', userInfoRouter)

const artCateRouter = require('./router/artcate.js') //导入文章管理 路由模块
app.use('/my/article', artCateRouter)

const articleRouter = require('./router/article') // 导入并使用文章路由模块
app.use('/my/article', articleRouter)

// 错误中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.send({
            status: 1,
            message: err.message
        })
    }

    // 捕获 token 字符串的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            message: '身份认证失败'
        })
    }

    // 未知错误
    res.send({
        status: 1,
        message: '未知错误'
    })
})

app.listen('80', () => { //启动服务器
    console.log('Express server running at http://127.0.0.1')
})