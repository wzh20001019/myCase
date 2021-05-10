const db = require('../db/index.js')

// 导入处理路径的 path 核心模块
const path = require('path')

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.send({
            status: 1,
            message: '文章封面是必选参数！'
        })
    }
    let sql = `insert into ev_articles set ?`

    const articleInfo = {
        ...req.body, // 标题、内容、状态、所属的分类Id

        cover_img: path.join('/uploads', req.file.filename), // 文章封面在服务器端的存放路径

        pub_date: new Date(), // 文章发布时间

        author_id: req.user.id, // 文章作者的Id
    }

    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '发布文章失败！'
            })
        }

        // 发布文章成功
        res.send({
            status: 0,
            message: '发布文章成功'
        })
    })
}