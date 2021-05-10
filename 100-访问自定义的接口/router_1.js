const express = require('express');

const router = express.Router();

router.get('/get', (req, res) => {
    let query = req.query;

    res.send({
        status: 0,
        mes: 'GET请求成功',
        data: query
    });
});

router.post('/post', (req, res) => {
    let body = req.body;

    res.send({
        status: 0,
        mes: 'POST请求成功',
        data: body
    });
});



module.exports = router;