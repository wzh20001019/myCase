window.addEventListener('load', function() {
    var move = document.querySelector('.move');
    var box1 = document.querySelector('.box1');
    var box2 = document.querySelector('.box2');
    var img = document.querySelector('.img1');

    box1.addEventListener('mouseover', function() {
        move.style.display = 'block';
        box2.style.display = 'block';
    })
    box1.addEventListener('mouseout', function() {
        move.style.display = 'none';
        box2.style.display = 'none';
    })

    box1.addEventListener('mousemove', function(e) {
        var x = e.pageX - box1.offsetLeft;
        var y = e.pageY - box1.offsetTop;
        var moveX = x - move.offsetWidth / 2;
        var moveY = y - move.offsetHeight / 2;
        var moveXMax = box1.offsetWidth - move.offsetWidth;
        var moveYMax = box1.offsetHeight - move.offsetHeight;
        if (moveX <= 0) {
            moveX = 0;
        } else if (moveX >= moveXMax) {
            moveX = moveXMax;
        }

        if (moveY <= 0) {
            moveY = 0;
        } else if (moveY >= moveYMax) {
            moveY = moveYMax;
        }
        move.style.left = moveX + 'px';
        move.style.top = moveY + 'px';

        var imgXMax = img.offsetWidth - box2.offsetWidth;
        var imgYMax = img.offsetHeight - box2.offsetHeight;
        var imgX = moveX * imgXMax / moveXMax;
        var imgY = moveY * imgYMax / moveYMax;
        img.style.left = -imgX + 'px';
        img.style.top = -imgY + 'px';
    })
})