var btn = document.querySelector('button'),
    atime = 60,
    time = atime;

btn.addEventListener('click', function(e) {
    this.disabled = true;
    var timer = setInterval(function() {
        if (time === 0) {
            btn.disabled = false;
            clearInterval(timer);
            btn.style.color = '#fff';
            btn.innerHTML = '发送';
            time = atime;
        } else {
            btn.style.color = '#333';
            btn.innerHTML = '还剩' + time + '秒可发送';
            time--;
        }
    }, 1000)
})