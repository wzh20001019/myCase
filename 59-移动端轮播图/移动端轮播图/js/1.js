window.addEventListener('load', function() {
    var banner = document.querySelector('section'),
        ul = banner.children[0],
        ol = banner.children[1],
        bannerWidth = banner.clientWidth;

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
    }

    var first_li = ul.children[0].cloneNode(true),
        last_li = ul.children[ul.children.length - 1].cloneNode(true);
    ul.appendChild(first_li);
    ul.insertBefore(last_li, ul.children[0]);

    var num = ol.children.length;

    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translateX = -index * bannerWidth;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);

    ul.addEventListener('transitionend', function() {
        if (index == num) {
            index = 0;
            var translateX = -index * bannerWidth;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = num - 1;
            var translateX = -index * bannerWidth;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }

        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });

    ol.children[0].classList.add('current');

    var startX = 0;
    var move = 0;
    var flag = false;
    banner.addEventListener('touchstart', function(e) {
        clearInterval(timer);
        startX = e.targetTouches[0].pageX;
    });

    banner.addEventListener('touchmove', function(e) {
        move = e.targetTouches[0].pageX - startX;

        var translateX = -index * bannerWidth + move;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true;
    });

    banner.addEventListener('touchend', function() {
        if (flag) {
            if (Math.abs(move) > 50) {
                if (move > 50) {
                    index--;
                } else {
                    index++;
                }
                var translateX = -index * bannerWidth;
                ul.style.transition = 'all .5s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                var translateX = -index * bannerWidth;
                ul.style.transition = 'all .2s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }

        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translateX = -index * bannerWidth;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    });
});