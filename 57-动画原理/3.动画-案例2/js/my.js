var wrapBox = document.querySelector('.wrap');
var spans = document.querySelectorAll('span');
var lis = document.querySelectorAll('li');

for (var i = 0; i < spans.length; i++) {
    spans[i].style.top = 40 * i + 'px';
}

for (var i = 0; i < lis.length; i++) {
    lis[i].style.top = 40 * i + 'px';
    lis[i].addEventListener('mouseover', function() {
        this.style.left = '-180px';
    })
}

spans[0].addEventListener('mouseover', function() {
    animation(lis[0], -180);
})
spans[0].addEventListener('mouseout', function() {
    animation(lis[0], 0);
})

spans[1].addEventListener('mouseover', function() {
    animation(lis[1], -180);
})
spans[1].addEventListener('mouseout', function() {
    animation(lis[1], 0);
})

spans[2].addEventListener('mouseover', function() {
    animation(lis[2], -180);
})
spans[2].addEventListener('mouseout', function() {
    animation(lis[2], 0);
})

spans[3].addEventListener('mouseover', function() {
    animation(lis[3], -180);
})
spans[3].addEventListener('mouseout', function() {
    animation(lis[3], 0);
})

spans[4].addEventListener('mouseover', function() {
    animation(lis[4], -180);
})
spans[4].addEventListener('mouseout', function() {
    animation(lis[4], 0);
})

spans[5].addEventListener('mouseover', function() {
    animation(lis[5], -180);
})
spans[5].addEventListener('mouseout', function() {
    animation(lis[5], 0);
})