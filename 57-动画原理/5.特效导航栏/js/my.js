window.addEventListener('load', function() {
    var nav = document.querySelector('.nav');
    var ul = document.querySelector('.ulBox');
    var lis = document.querySelectorAll('.list');
    var as = document.querySelectorAll('a');
    var moveBox = document.querySelector('.moveBox');
    var moveWidth = moveBox.offsetWidth;

    var current = 0;
    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('mouseenter', function() {
            animationL(moveBox, this.offsetLeft);
        })

        lis[i].addEventListener('mouseleave', function() {
            animationL(moveBox, current);
        })

        lis[i].addEventListener('click', function() {
            current = this.offsetLeft;
        })
    }

    for (var i = 0; i < as.length; i++) {
        as[i].addEventListener('click', function() {
            for (var i = 0; i < as.length; i++) {
                as[i].style.color = '#333';
            }
            this.style.color = 'orange';
        })
    }
})