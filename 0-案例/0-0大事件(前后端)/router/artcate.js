const express = require('express')

const router = express.Router()

const artHandler = require('../router_handler/artcate.js')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require('../schema/artcate')

//获取文章的信息
router.get('/cates', artHandler.getArticleCates)

//新增文章信息
router.post('/addcates', expressJoi(add_cate_schema), artHandler.addArticleCates)

//删除文章信息
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artHandler.deleteCateById)

// 根据 Id 获取文章分类的处理函数
router.get('/cates/:id', expressJoi(delete_cate_schema), artHandler.getArtCateById)

// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artHandler.updateCateById)
module.exports = router