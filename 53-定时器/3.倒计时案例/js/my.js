// 1.获取元素
var hour = document.querySelector('.hour');
console.log(hour);
var minute = document.querySelector('.minute');
console.log(minute);
var second = document.querySelector('.second');
var inputtime = +new Date('2020-9-15-02:00'); //用户输入截止时间

Countdown(); //调用函数, 页面刷新就调用函数
// 2.
function Countdown() {
    var time = +new Date(); //获得当前毫秒数
    var times = (inputtime - time) / 1000; //得到从现在到截止时间的秒数

    h = parseInt(times / 60 / 60 % 24); //得到小时数
    if (h < 10) { //判断得到的小时数数字是否是个位数
        h = '0' + h;
    } else {
        h = h;
    }
    hour.innerHTML = h;

    m = parseInt(times / 60 % 60); //得到分钟 数
    if (m < 10) { //判断得到的分钟数数字是否是个位数
        m = '0' + m;
    } else {
        m = m;
    }
    minute.innerHTML = m;

    s = parseInt(times % 60); //得到秒数
    if (s < 10) { //判断得到的秒数数字是否是个位数
        s = '0' + s;
    } else {
        s = s;
    }
    second.innerHTML = s;
}

setInterval(Countdown, 1000);