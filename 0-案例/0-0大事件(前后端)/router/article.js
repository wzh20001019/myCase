const express = require('express') // 导入 express

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')

// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const router = express.Router() // 创建路由对象

const articleHandler = require('../router_handler/article.js')

const expressJoi = require('@escook/express-joi')

const { add_article_schema } = require('../schema/article.js')

// 发布新文章
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleHandler.addArticle)

// 向外共享路由对象
module.exports = router