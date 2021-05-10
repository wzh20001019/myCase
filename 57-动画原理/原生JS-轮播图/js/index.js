window.addEventListener('load', function() {
    var banner = document.querySelector('.banner'),
        left_box = document.querySelector('.left'),
        right_box = document.querySelector('.right');

    banner.addEventListener('selectstart', function(e) { //文本不能被选中
        e.preventDefault();
    });

    banner.addEventListener('mouseenter', function() {
        left_box.style.display = 'block';
        right_box.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });

    banner.addEventListener('mouseleave', function() {
        left_box.style.display = 'none';
        right_box.style.display = 'none';

        timer = setInterval(function() {
            right_box.click();
        }, 2000);
    });

    var ul = document.querySelector('ul'),
        ol = document.querySelector('ol');

    var bannerWidth = banner.clientWidth;

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);

        li.addEventListener('click', function() {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';

            var index = parseFloat(this.dataset.index);
            num = index;
            circle = index;
            animate(ul, -(index * bannerWidth));
        });

        ol.children[0].className = 'current';
    }

    var first_li = ul.children[0].cloneNode(true);
    ul.appendChild(first_li);

    var num = 0; //左右侧按钮的值
    var circle = 0; //小圆点的索引值

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    var flag = true; //节流阀

    left_box.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * bannerWidth + 'px';
            }
            num--;
            circle--;

            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            animate(ul, -(num * bannerWidth), function() {
                flag = true;
            });

            circleChange();
        }
    });

    right_box.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == (ul.children.length - 1)) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            circle++;

            if (circle == ol.children.length) {
                circle = 0;
            }

            animate(ul, -(num * bannerWidth), function() {
                flag = true;
            });

            circleChange();
        }
    });

    var timer = setInterval(function() {
        right_box.click();
    }, 2500);
});