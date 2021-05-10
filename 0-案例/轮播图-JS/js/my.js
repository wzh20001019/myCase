window.addEventListener('load', function() {
    var wrap = document.querySelector('.wrap');
    var wrapWidth = wrap.offsetWidth;
    var btnLeft = document.querySelector('.arrow-left');
    var btnRight = document.querySelector('.arrow-right');
    var ul1 = document.querySelector('.ul1');
    var ul2 = document.querySelector('.ul2');

    wrap.addEventListener('mouseenter', function() {
        btnLeft.style.display = 'block';
        btnRight.style.display = 'block';
        clearInterval(timer);
    })

    wrap.addEventListener('mouseleave', function() {
        btnLeft.style.display = 'none';
        btnRight.style.display = 'none';
        timer = setInterval(function() {
            btnRight.click();
        }, 2000)
    })

    for (var i = 0; i < ul1.children.length; i++) {
        var li = document.createElement('li');
        ul2.appendChild(li);

        li.setAttribute('index', i);
        li.addEventListener('click', function() {
            for (var i = 0; i < ul2.children.length; i++) {
                ul2.children[i].className = '';
            }
            this.className = 'cor';
            var index = this.getAttribute('index');
            animation(ul1, -index * wrapWidth);
            imgNum = index;
            btnNum = index;
        })
    }
    ul2.children[0].className = 'cor'; //默认选中第一个li
    var first = ul1.children[0].cloneNode(true);
    ul1.appendChild(first);

    var imgNum = 0;
    var btnNum = 0;
    var faLg = true;
    btnLeft.addEventListener('click', function() {
        if (faLg) {
            faLg = false;
            if (imgNum == 0) {
                imgNum = ul2.children.length;
                ul1.style.left = -imgNum * wrapWidth + 'px';
            }
            imgNum--;
            animation(ul1, -imgNum * wrapWidth, function() {
                faLg = true;
            });

            btnNum--;
            if (btnNum == -1) {
                btnNum = ul2.children.length - 1;
            }
            btnChange();
        }
    })

    btnRight.addEventListener('click', function() {
        if (faLg) {
            faLg = false;
            if (imgNum == ul1.children.length - 1) {
                ul1.style.left = '0px';
                imgNum = 0;
            }
            imgNum++;
            animation(ul1, -imgNum * wrapWidth, function() {
                faLg = true;
            });

            btnNum++;
            if (btnNum == ul2.children.length) {
                btnNum = 0;
            }
            btnChange();
        }
    })

    function btnChange() {
        for (var i = 0; i < ul2.children.length; i++) {
            ul2.children[i].className = '';
        }
        ul2.children[btnNum].className = 'cor';
    }

    var timer = setInterval(function() {
        btnRight.click();
    }, 2000)
})