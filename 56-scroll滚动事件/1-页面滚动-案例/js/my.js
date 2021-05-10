var boxF = document.querySelector('.f');
var banner = document.querySelector('.banner');
var boxFTop = boxF.offsetTop - banner.offsetTop;
var main = document.querySelector('.main');
var T = document.querySelector('.goTop');

function animation(obj, target, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - window.pageYOffset) / 10;
        if (step > 0) {
            step = Math.ceil(step);
        } else {
            step = Math.floor(step);
        }
        window.scroll(0, window.pageYOffset + step);

        if (window.pageYOffset == target) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}

document.addEventListener('scroll', function(e) {
    if (window.pageYOffset >= banner.offsetTop) {
        boxF.style.position = 'fixed';
        boxF.style.top = boxFTop + 'px';
    } else {
        boxF.style.position = 'absolute';
        boxF.style.top = 220 + 'px';
    }

    if (window.pageYOffset >= main.offsetTop) {
        T.style.display = 'block';
    } else {
        T.style.display = 'none';
    }
})
T.addEventListener('click', function() {
    animation(window, 0);
})