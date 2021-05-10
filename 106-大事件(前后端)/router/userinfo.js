const express = require('express')

const router = express.Router()

const userInfoHandler = require('../router_handler/userinfo.js')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { update_userInfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user.js')


//获取用户信息
router.get('/userinfo', userInfoHandler.getUserInfo)

// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userInfo_schema), userInfoHandler.updateUserInfo)

//重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userInfoHandler.updatePassword)

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfoHandler.updateAvatar)

module.exports = router