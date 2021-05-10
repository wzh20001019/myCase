const db = require('../db/index.js') //导入数据库文件

//获取文章的信息
module.exports.getArticleCates = (req, res) => {
    let sql1 = 'select * from ev_article_cate where is_delete=0 order by id asc'

    db.query(sql1, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        res.send({
            status: 0,
            message: '获取文章信息成功',
            data: results
        })
    })
}

//新增文章信息
module.exports.addArticleCates = (req, res) => {
    let sql1 = 'select * from ev_article_cate where name=? or alias=?'
    let sql2 = 'insert into ev_article_cate set ?'
    db.query(sql1, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.send({
                status: 1,
                message: '分类名称与分类别名被占用,请更换后重试'
            })
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.send({
                status: 1,
                message: '分类名称被占用,请更换后重试'
            })
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.send({
                status: 1,
                message: '分类别名被占用,请更换后重试'
            })
        }
        if (results.length === 2) {
            return res.send({
                status: 1,
                message: '分类名称与分类别名被占用,请更换后重试'
            })
        }

        db.query(sql2, req.body, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '新增数据失败'
                })
            }
            res.send({
                status: 0,
                message: '新增数据成功'
            })
        })
    })
}

//删除文章信息
module.exports.deleteCateById = (req, res) => {
    let sql1 = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql1, req.params.id, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '删除数据失败'
            })
        }
        res.send({
            status: 0,
            message: '数据已删除'
        })
    })
}

// 根据 Id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
    let sql1 = 'select * from ev_article_cate where id=?'
    db.query(sql1, req.params.id, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: '获取信息失败'
            })
        }
        if (results[0].is_delete === 1) {
            return res.send({
                status: 1,
                message: '获取的信息已删除'
            })
        }
        res.send({
            status: 0,
            message: '获取信息成功',
            data: results[0]
        })
    })
}

// 更新文章分类的处理函数
module.exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    let sql = `select * from ev_article_cate where name=? or alias=?`
    let sql1 = `update ev_article_cate set ? where id=?`

    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.send({
                status: 1,
                message: '分类名称与分类别名被占用,请更换后重试'
            })
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.send({
                status: 1,
                message: '分类名称被占用,请更换后重试'
            })
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.send({
                status: 1,
                message: '分类别名被占用,请更换后重试'
            })
        }
        if (results.length === 2) {
            return res.send({
                status: 1,
                message: '分类名称与分类别名被占用,请更换后重试'
            })
        }

        db.query(sql1, [req.body, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '更新文章分类失败！'
                })
            }

            // 更新文章分类成功
            res.send({
                status: 0,
                message: '更新文章分类成功！'
            })
        })
    })
}