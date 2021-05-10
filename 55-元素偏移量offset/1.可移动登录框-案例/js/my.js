var btn1 = document.querySelector('button');
var btn2 = document.querySelector('span');
var wrap = document.querySelector('.wrap');
var box = document.querySelector('.box2');
var title = document.querySelector('h2');

btn1.addEventListener('click', function() {
    wrap.style.display = 'block';
})

btn2.addEventListener('click', function() {
    wrap.style.display = 'none';
})

title.addEventListener('mousedown', function(e) {
    var x = e.pageX - box.offsetLeft;
    var y = e.pageY - box.offsetTop;

    document.addEventListener('mousemove', move)

    function move(e) {
        box.style.left = e.pageX - x + 'px';
        box.style.top = e.pageY - y + 'px';
    }

    document.addEventListener('mouseup', function(e) {
        this.removeEventListener('mousemove', move);
    })

})