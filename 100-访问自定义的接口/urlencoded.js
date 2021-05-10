const express = require('express');

const app = express();

const mn = require('./url_.js');

app.use(mn);

app.post('/', (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1');
});