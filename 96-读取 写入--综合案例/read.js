const fs = require('fs');
const path = require('path');

let regStyle = /<style>[\s\S]*<\/style>/;
let regScript = /<script>[\s\S]*<\/script>/;

let pathIndex = path.join(__dirname, '/index.html');

fs.readFile(pathIndex, 'utf-8', (err, dataStr) => {
    if (err != null) {
        return console.log(err.message);
    }
    css(dataStr);

    js(dataStr);

    html(dataStr);
});

function css(data) {
    let oldCss = regStyle.exec(data);
    let newCss = oldCss[0].replace('<style>', '').replace('</style>', '');

    fs.writeFile(path.join(__dirname, '/code/index.css'), newCss, 'utf8', function(err) {
        if (err) {
            return console.log('写入失败' + err.message);
        }
    });
}

function js(data) {
    let oldJs = regScript.exec(data);
    let newJs = oldJs[0].replace('<script>', '').replace('</script>', '');

    fs.writeFile(path.join(__dirname, '/code/index.js'), newJs, 'utf8', function(err) {
        if (err) {
            return console.log('写入失败' + err.message);
        }
    });
}

function html(data) {
    let newHtml = data.replace(regStyle, '<link rel="stylesheet" href="./index.css">')
        .replace(regScript, '<script src="./index.js"></script>');
    fs.writeFile(path.join(__dirname, '/code/index.html'), newHtml, 'utf8', function(err) {
        if (err) {
            return console.log('写入失败' + err.message);
        }
    });
}