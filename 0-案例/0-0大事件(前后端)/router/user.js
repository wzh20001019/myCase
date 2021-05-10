const express = require('express')

const router = express.Router() //创建路由对象

const userHandler = require('../router_handler/user.js')

// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')


//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.reguser)

//登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router //将 router路由对象共享出去