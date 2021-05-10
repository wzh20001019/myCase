const http = require('http');

const fs = require('fs');

const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url;

    let pathName = '';
    if (url === '/') {
        pathName = path.join(__dirname, '/code/index.html');
    } else {
        pathName = path.join(__dirname, '/code', url);
    }

    fs.readFile(pathName, 'utf8', (err, data) => {
        if (err) {
            return res.end('404 Not Found');
        }
        res.end(data);
    });
});

server.listen(80, () => {
    console.log('http://127.0.0.1');
});