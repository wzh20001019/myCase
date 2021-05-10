const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/code/jsonp', (req, res) => {
    let name = req.query.callback;
    let data = {
        name: 'wzh',
        age: 20,
        sex: '男'
    };
    let dataStr = `${name}(${JSON.stringify(data)})`;
    res.send(dataStr);
});

const cors = require('cors');
app.use(cors());

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
});