// 1.获取元素
var r1 = document.querySelector('.r1');
var r2 = document.querySelector('.r2');
var r3 = document.querySelector('.r3');
var r4 = document.querySelector('.r4');
var r5 = document.querySelector('.r5');

// 2.绑定事件
document.addEventListener('mousemove', function(e) {
    var x = e.pageX;
    var y = e.pageY;
    r1.style.left = x + 'px';
    r1.style.top = y + 'px';
    r2.style.left = x + 15 + 'px';
    r2.style.top = y + 15 + 'px';
    r3.style.left = x - 20 + 'px';
    r3.style.top = y - 20 + 'px';
    r4.style.left = x - 20 + 'px';
    r4.style.top = y + 20 + 'px';
    r5.style.left = x + 20 + 'px';
    r5.style.top = y - 20 + 'px';
})