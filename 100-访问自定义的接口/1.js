const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/', (req, res) => {
    res.send(req.body);
})

app.post('/code', (req, res) => {
    res.send(req.body);
})

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})