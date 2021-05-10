var ali = document.querySelectorAll('.a li'),
    bli = document.querySelectorAll('.b li');

ali.forEach(function(dom, index) {
    dom.addEventListener('mouseenter', function() {
        bli[index].style.border = '1px solid #777';
        animate(bli[index], 0);
    });

    dom.addEventListener('mouseleave', function() {
        animate(bli[index], 200, function() {
            bli[index].style.border = 'none';
        });
    });
});