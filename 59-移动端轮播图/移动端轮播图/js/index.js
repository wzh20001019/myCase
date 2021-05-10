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

    var num = 0;
    var index = 0;
    var timer = setInterval(function() {
        num++;
        index++;
        if (index == 5) {
            index = 0;
        }
        var move = -num * bannerWidth;

        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + move + 'px)';

        // ol.querySelector('.current').classList.remove('current');
        // ol.children[index].classList.add('current');
    }, 2000);

    ul.addEventListener('transitionend', function() {
        if (num >= 5) {
            num = 0;
            var move = -num * bannerWidth;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + move + 'px)';
        } else if (num < 0) {
            num = 4;
            var move = -num * bannerWidth;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + move + 'px)';
        }

        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });

    ol.children[0].classList.add('current');


    var startX = 0;
    var moveX = 0;
    var translateX = 0;
    banner.addEventListener('touchstart', function(e) {
        clearInterval(timer);
        startX = e.targetTouches[0].pageX;
    });

    banner.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        translateX = -index * bannerWidth;

        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + (translateX + moveX) + 'px)';
    });

    banner.addEventListener('touchend', function(e) {
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            var translateX = -index * bannerWidth;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
    });
});