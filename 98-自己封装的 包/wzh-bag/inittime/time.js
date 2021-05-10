function initTime(data) {
    let time = new Date(data);

    let YYYY = init(time.getFullYear()),
        MM = init(time.getMonth() + 1),
        DD = init(time.getDate()),
        HH = init(time.getHours()),
        mm = init(time.getMinutes()),
        ss = init(time.getSeconds());

    return `${YYYY}-${MM}-${DD}-${HH}:${mm}:${ss}`;
}

function init(n) {
    if (n > 10) {
        n = n;
    } else {
        n = '0' + n;
    }
    return n;
}

module.exports.initTime = initTime;