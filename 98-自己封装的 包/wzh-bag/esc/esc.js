function htmlStr(str) {
    let html = str.replace(/<|>|"|&/g, match => {
        switch (match) {
            case '<':
                return '&lt';
            case '>':
                return '&gt';
            case '"':
                return '&quot';
            case '&':
                return '&amp';
        }
    });
    return html;
}

function restore(str) {
    let results = str.replace(/&lt|&gt|&quot|&amp/g, match => {
        switch (match) {
            case '&lt':
                return '<';
            case '&gt':
                return '>';
            case '&quot':
                return '"';
            case '&amp':
                return '&';
        }
    });
    return results;
}

module.exports.htmlStr = htmlStr;
module.exports.restore = restore;