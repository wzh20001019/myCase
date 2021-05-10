const qs = require('querystring');

let mn = (req, res, next) => {
    let str = '';
    req.on('data', chunk => {
        str += chunk;
    });

    req.on('end', () => {
        const body = qs.parse(str);
        req.body = body;
        next();
    });
}

module.exports = mn;