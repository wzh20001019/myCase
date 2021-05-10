window.addEventListener('load', function() {
    var div = document.querySelector('div');
    var x = 0;
    var y = 0;
    var startX = 0;
    var startY = 0;
    div.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
        x = this.offsetLeft;
        y = this.offsetTop;
    })

    div.addEventListener('touchmove', function(e) {
        var moveX = e.targetTouches[0].pageX - startX;
        var moveY = e.targetTouches[0].pageY - startY;
        div.style.left = x + moveX + 'px';
        div.style.top = y + moveY + 'px';
    })
})